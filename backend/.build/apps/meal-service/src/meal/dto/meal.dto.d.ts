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
