import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<{
        mealCount: number;
        totalAmount: number;
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    getUserSummary(id: string): Promise<{
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
    health(): {
        status: string;
    };
}
