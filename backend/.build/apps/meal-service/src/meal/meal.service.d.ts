import { PrismaService } from '../prisma/prisma.service';
import { CreateMealDto, UpdateMealDto } from './dto/meal.dto';
import { BulkMealDto } from './dto/bulk-meal.dto';
import { BulkUpdateDto, BulkDeleteDto } from './dto/bulk-operations.dto';
import { CalendarQueryDto } from './dto/calendar.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class MealService {
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
}
