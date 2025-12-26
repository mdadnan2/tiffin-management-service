import { MealType } from '@prisma/client';
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
