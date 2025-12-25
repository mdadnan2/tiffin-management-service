import { IsEnum, IsDateString, IsInt, IsOptional, Min, IsArray, ValidateIf, IsBoolean, ArrayMinSize, ArrayMaxSize, IsString, Matches } from 'class-validator';
import { MealType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMealDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: MealType, example: 'LUNCH' })
  @IsEnum(MealType)
  mealType: MealType;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  count: number;

  @ApiProperty({ example: 'Extra spicy', required: false })
  @IsOptional()
  note?: string;
}

export class UpdateMealDto {
  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;

  @ApiProperty({ example: 'Updated note', required: false })
  @IsOptional()
  note?: string;
}

export class BulkMealDto {
  @ApiProperty({ example: ['2024-01-15', '2024-01-16'], required: false })
  @ValidateIf(o => !o.startDate && !o.endDate)
  @IsArray()
  @IsDateString({}, { each: true })
  dates?: string[];

  @ApiProperty({ example: '2024-01-15', required: false })
  @ValidateIf(o => !o.dates)
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-01-19', required: false })
  @ValidateIf(o => !o.dates)
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: [1, 2, 3, 4, 5], description: '0=Sunday, 1=Monday, ..., 6=Saturday', required: false })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  daysOfWeek?: number[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  skipWeekends?: boolean;

  @ApiProperty({ enum: MealType, example: 'LUNCH' })
  @IsEnum(MealType)
  mealType: MealType;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  count: number;

  @ApiProperty({ example: 'Weekly lunch', required: false })
  @IsOptional()
  note?: string;
}

export class BulkUpdateDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-01-19' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: MealType, example: 'LUNCH', required: false })
  @IsOptional()
  @IsEnum(MealType)
  mealType?: MealType;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;

  @ApiProperty({ example: 'Updated for the week', required: false })
  @IsOptional()
  note?: string;
}

export class BulkDeleteDto {
  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-01-19' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: MealType, example: 'LUNCH', required: false })
  @IsOptional()
  @IsEnum(MealType)
  mealType?: MealType;
}

export class CalendarQueryDto {
  @ApiProperty({ example: '2024-01', description: 'Month in YYYY-MM format', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'month must be in YYYY-MM format' })
  month?: string;

  @ApiProperty({ example: '2024-W03', description: 'Week in YYYY-Www format', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-W\d{2}$/, { message: 'week must be in YYYY-Www format' })
  week?: string;
}

export class MonthlyDashboardDto {
  @ApiProperty({ example: '2024-01', description: 'Month in YYYY-MM format', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'month must be in YYYY-MM format' })
  month?: string;
}

export class WeeklyDashboardDto {
  @ApiProperty({ example: '2024-W03', description: 'Week in YYYY-Www format', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-W\d{2}$/, { message: 'week must be in YYYY-Www format' })
  week?: string;
}
