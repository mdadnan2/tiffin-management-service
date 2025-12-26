import { PriceService } from './price.service';
import { UpdatePriceDto } from './dto/price.dto';
export declare class PriceController {
    private priceService;
    constructor(priceService: PriceService);
    getMyPrice(user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        breakfast: import("@prisma/client/runtime/library").Decimal;
        lunch: import("@prisma/client/runtime/library").Decimal;
        dinner: import("@prisma/client/runtime/library").Decimal;
        custom: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateMyPrice(user: any, dto: UpdatePriceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        breakfast: import("@prisma/client/runtime/library").Decimal;
        lunch: import("@prisma/client/runtime/library").Decimal;
        dinner: import("@prisma/client/runtime/library").Decimal;
        custom: import("@prisma/client/runtime/library").Decimal;
    }>;
    getUserPrice(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        breakfast: import("@prisma/client/runtime/library").Decimal;
        lunch: import("@prisma/client/runtime/library").Decimal;
        dinner: import("@prisma/client/runtime/library").Decimal;
        custom: import("@prisma/client/runtime/library").Decimal;
    }>;
}
