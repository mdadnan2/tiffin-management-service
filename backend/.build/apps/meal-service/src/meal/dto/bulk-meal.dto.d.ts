import { MealType } from '@prisma/client';
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
