import { MealService } from './meal.service';
import { CreateMealDto, UpdateMealDto } from './dto/meal.dto';
import { BulkMealDto } from './dto/bulk-meal.dto';
import { BulkUpdateDto, BulkDeleteDto } from './dto/bulk-operations.dto';
import { CalendarQueryDto } from './dto/calendar.dto';
export declare class MealController {
    private mealService;
    constructor(mealService: MealService);
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
