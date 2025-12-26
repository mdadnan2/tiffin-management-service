import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto, UpdatePriceDto } from './dto/users.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    listUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    getPrice(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        breakfast: Decimal;
        lunch: Decimal;
        dinner: Decimal;
        custom: Decimal;
    }>;
    updatePrice(userId: string, dto: UpdatePriceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        breakfast: Decimal;
        lunch: Decimal;
        dinner: Decimal;
        custom: Decimal;
    }>;
}
