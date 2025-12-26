import { MealsService } from './meals.service';
import { CreateMealDto, UpdateMealDto, BulkMealDto, BulkUpdateDto, BulkDeleteDto, CalendarQueryDto, MonthlyDashboardDto, WeeklyDashboardDto } from './dto/meals.dto';
export declare class MealsController {
    private mealsService;
    constructor(mealsService: MealsService);
    health(): {
        status: string;
    };
    createMeal(user: any, dto: CreateMealDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
    createBulkMeals(user: any, dto: BulkMealDto): Promise<{
        created: number;
        meals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            date: Date;
            mealType: import(".prisma/client").$Enums.MealType;
            count: number;
            note: string | null;
            priceAtTime: import("@prisma/client/runtime/library").Decimal;
            status: import(".prisma/client").$Enums.MealStatus;
            isBulkScheduled: boolean;
        }[];
    }>;
    listMeals(user: any, date?: string, mealType?: string, startDate?: string, endDate?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }[]>;
    getCalendar(user: any, query: CalendarQueryDto): Promise<Record<string, any[]>>;
    bulkUpdateMeals(user: any, dto: BulkUpdateDto): Promise<{
        updated: number;
    }>;
    bulkCancelMeals(user: any, dto: BulkDeleteDto): Promise<{
        cancelled: number;
    }>;
    updateMeal(user: any, id: string, dto: UpdateMealDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
    cancelMeal(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
}
export declare class DashboardController {
    private mealsService;
    constructor(mealsService: MealsService);
    getDashboard(user: any): Promise<{
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
    }>;
    getMonthlyDashboard(user: any, query: MonthlyDashboardDto): Promise<{
        month: string;
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
        daysWithMeals: number;
        byWeek: Record<number, {
            meals: number;
            amount: number;
        }>;
    }>;
    getWeeklyDashboard(user: any, query: WeeklyDashboardDto): Promise<{
        week: string;
        totalMeals: number;
        byType: {};
        totalAmount: number;
        byDay: Record<string, {
            meals: number;
            amount: number;
        }>;
    }>;
}
