import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        mealCount: number;
        totalAmount: number;
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    getUserSummary(userId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
        };
        totalMeals: number;
        byType: {};
        totalAmount: number;
    }>;
}
