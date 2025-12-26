import { MealType } from '@prisma/client';
export declare class CreateMealDto {
    date: string;
    mealType: MealType;
    count: number;
    note?: string;
}
export declare class UpdateMealDto {
    count?: number;
    note?: string;
}
export declare class BulkMealDto {
    dates?: string[];
    startDate?: string;
    endDate?: string;
    daysOfWeek?: number[];
    skipWeekends?: boolean;
    mealType: MealType;
    count: number;
    note?: string;
}
export declare class BulkUpdateDto {
    startDate: string;
    endDate: string;
    mealType?: MealType;
    count?: number;
    note?: string;
}
export declare class BulkDeleteDto {
    startDate: string;
    endDate: string;
    mealType?: MealType;
}
export declare class CalendarQueryDto {
    month?: string;
    week?: string;
}
export declare class MonthlyDashboardDto {
    month?: string;
}
export declare class WeeklyDashboardDto {
    week?: string;
}
