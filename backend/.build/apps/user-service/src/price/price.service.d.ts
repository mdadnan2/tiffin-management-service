import { PrismaService } from '../prisma/prisma.service';
import { UpdatePriceDto } from './dto/price.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class PriceService {
    private prisma;
    constructor(prisma: PrismaService);
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
