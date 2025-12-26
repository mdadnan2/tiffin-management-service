import { UsersService } from './users.service';
import { UpdateUserDto, UpdatePriceDto } from './dto/users.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    health(): {
        status: string;
    };
    getProfile(user: any): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateUserDto): Promise<{
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
}
