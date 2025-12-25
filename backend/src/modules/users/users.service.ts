import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto, UpdatePriceDto } from './dto/users.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, mobile: true, role: true, createdAt: true },
    });
    if (!user) throw new NotFoundException(`User with ID '${userId}' not found`);
    return user;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID '${userId}' not found`);
    
    return this.prisma.user.update({
      where: { id: userId },
      data: { name: dto.name, mobile: dto.mobile },
      select: { id: true, email: true, name: true, mobile: true, role: true },
    });
  }

  async listUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, mobile: true, role: true, createdAt: true },
    });
  }

  async getPrice(userId: string) {
    let price = await this.prisma.priceSetting.findUnique({ where: { userId } });
    
    if (!price) {
      price = await this.prisma.priceSetting.create({
        data: { userId },
      });
    }
    
    return price;
  }

  async updatePrice(userId: string, dto: UpdatePriceDto) {
    const data: any = {};
    if (dto.breakfast !== undefined) {
      if (dto.breakfast < 0) throw new BadRequestException('Breakfast price cannot be negative');
      data.breakfast = new Decimal(dto.breakfast);
    }
    if (dto.lunch !== undefined) {
      if (dto.lunch < 0) throw new BadRequestException('Lunch price cannot be negative');
      data.lunch = new Decimal(dto.lunch);
    }
    if (dto.dinner !== undefined) {
      if (dto.dinner < 0) throw new BadRequestException('Dinner price cannot be negative');
      data.dinner = new Decimal(dto.dinner);
    }
    if (dto.custom !== undefined) {
      if (dto.custom < 0) throw new BadRequestException('Custom price cannot be negative');
      data.custom = new Decimal(dto.custom);
    }

    return this.prisma.priceSetting.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }
}
