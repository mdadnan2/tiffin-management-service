import { PrismaService } from '../../prisma/prisma.service';
import { CreateMealDto, UpdateMealDto, BulkMealDto, BulkUpdateDto, BulkDeleteDto, CalendarQueryDto, MonthlyDashboardDto, WeeklyDashboardDto } from './dto/meals.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class MealsService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdateMeal(userId: string, dto: CreateMealDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
    createBulkMeals(userId: string, dto: BulkMealDto): Promise<{
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
            priceAtTime: Decimal;
            status: import(".prisma/client").$Enums.MealStatus;
            isBulkScheduled: boolean;
        }[];
    }>;
    private generateDateRange;
    listMeals(userId: string, date?: string, mealType?: string, startDate?: string, endDate?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }[]>;
    updateMeal(userId: string, mealId: string, dto: UpdateMealDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
    cancelMeal(userId: string, mealId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        date: Date;
        mealType: import(".prisma/client").$Enums.MealType;
        count: number;
        note: string | null;
        priceAtTime: Decimal;
        status: import(".prisma/client").$Enums.MealStatus;
        isBulkScheduled: boolean;
    }>;
    getCalendar(userId: string, query: CalendarQueryDto): Promise<Record<string, any[]>>;
    bulkUpdateMeals(userId: string, dto: BulkUpdateDto): Promise<{
        updated: number;
    }>;
    bulkCancelMeals(userId: string, dto: BulkDeleteDto): Promise<{
        cancelled: number;
    }>;
    getUserDashboard(userId: string): Promise<{
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
    }>;
    getMonthlyDashboard(userId: string, dto: MonthlyDashboardDto): Promise<{
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
    getWeeklyDashboard(userId: string, dto: WeeklyDashboardDto): Promise<{
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
