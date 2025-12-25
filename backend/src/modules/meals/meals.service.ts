import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMealDto, UpdateMealDto, BulkMealDto, BulkUpdateDto, BulkDeleteDto, CalendarQueryDto, MonthlyDashboardDto, WeeklyDashboardDto } from './dto/meals.dto';
import { MealStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class MealsService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateMeal(userId: string, dto: CreateMealDto) {
    const priceSettings = await this.prisma.priceSetting.findUnique({ where: { userId } });
    const priceAtTime = priceSettings?.[dto.mealType.toLowerCase()] || new Decimal(0);

    return this.prisma.mealRecord.upsert({
      where: {
        userId_date_mealType: {
          userId,
          date: new Date(dto.date),
          mealType: dto.mealType,
        },
      },
      update: {
        count: dto.count,
        note: dto.note,
        priceAtTime,
        status: MealStatus.ACTIVE,
        isBulkScheduled: false,
      },
      create: {
        userId,
        date: new Date(dto.date),
        mealType: dto.mealType,
        count: dto.count,
        note: dto.note,
        priceAtTime,
        isBulkScheduled: false,
      },
    });
  }

  async createBulkMeals(userId: string, dto: BulkMealDto) {
    let dates: string[];

    if (dto.dates) {
      dates = dto.dates;
    } else if (dto.startDate && dto.endDate) {
      dates = this.generateDateRange(dto.startDate, dto.endDate, dto.daysOfWeek, dto.skipWeekends);
    } else {
      throw new BadRequestException('Invalid bulk meal request: Provide either "dates" array or "startDate" and "endDate"');
    }

    const priceSettings = await this.prisma.priceSetting.findUnique({ where: { userId } });
    const priceAtTime = priceSettings?.[dto.mealType.toLowerCase()] || new Decimal(0);

    const meals = await Promise.all(
      dates.map(date =>
        this.prisma.mealRecord.upsert({
          where: {
            userId_date_mealType: {
              userId,
              date: new Date(date),
              mealType: dto.mealType,
            },
          },
          update: {
            count: dto.count,
            note: dto.note,
            priceAtTime,
            status: MealStatus.ACTIVE,
            isBulkScheduled: true,
          },
          create: {
            userId,
            date: new Date(date),
            mealType: dto.mealType,
            count: dto.count,
            note: dto.note,
            priceAtTime,
            isBulkScheduled: true,
          },
        })
      )
    );

    return { created: meals.length, meals };
  }

  private generateDateRange(startDate: string, endDate: string, daysOfWeek?: number[], skipWeekends?: boolean): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      throw new BadRequestException(`Invalid date range: startDate (${startDate}) must be before or equal to endDate (${endDate})`);
    }

    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 90) {
      throw new BadRequestException(`Date range too large: ${daysDiff} days. Maximum allowed is 90 days`);
    }

    if (daysOfWeek) {
      const invalidDays = daysOfWeek.filter(d => d < 0 || d > 6);
      if (invalidDays.length > 0) {
        throw new BadRequestException(`Invalid daysOfWeek values: [${invalidDays.join(', ')}]. Must be between 0 (Sunday) and 6 (Saturday)`);
      }
    }

    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      let includeDate = true;

      if (skipWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
        includeDate = false;
      }

      if (daysOfWeek && !daysOfWeek.includes(dayOfWeek)) {
        includeDate = false;
      }

      if (includeDate) {
        dates.push(current.toISOString().split('T')[0]);
      }

      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  async listMeals(userId: string, date?: string, mealType?: string, startDate?: string, endDate?: string) {
    const where: any = { userId, status: MealStatus.ACTIVE };
    if (date) where.date = new Date(date);
    if (mealType) where.mealType = mealType;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    return this.prisma.mealRecord.findMany({ where, orderBy: { date: 'desc' } });
  }

  async updateMeal(userId: string, mealId: string, dto: UpdateMealDto) {
    const meal = await this.prisma.mealRecord.findUnique({ where: { id: mealId } });
    if (!meal) {
      throw new BadRequestException(`Meal with ID '${mealId}' not found`);
    }
    if (meal.userId !== userId) {
      throw new BadRequestException('You do not have permission to update this meal');
    }

    return this.prisma.mealRecord.update({
      where: { id: mealId },
      data: { count: dto.count, note: dto.note },
    });
  }

  async cancelMeal(userId: string, mealId: string) {
    const meal = await this.prisma.mealRecord.findUnique({ where: { id: mealId } });
    if (!meal) {
      throw new BadRequestException(`Meal with ID '${mealId}' not found`);
    }
    if (meal.userId !== userId) {
      throw new BadRequestException('You do not have permission to cancel this meal');
    }

    return this.prisma.mealRecord.update({
      where: { id: mealId },
      data: { status: MealStatus.CANCELLED },
    });
  }

  async getCalendar(userId: string, query: CalendarQueryDto) {
    let startDate: Date;
    let endDate: Date;

    if (query.month) {
      const [year, month] = query.month.split('-').map(Number);
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (query.week) {
      const [year, week] = query.week.split('-W').map(Number);
      const firstDayOfYear = new Date(year, 0, 1);
      const daysOffset = (week - 1) * 7;
      startDate = new Date(firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);
      endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    } else {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    const meals = await this.prisma.mealRecord.findMany({
      where: {
        userId,
        status: MealStatus.ACTIVE,
        date: { gte: startDate, lte: endDate },
      },
      orderBy: { date: 'asc' },
    });

    const calendar: Record<string, any[]> = {};
    meals.forEach(meal => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!calendar[dateKey]) calendar[dateKey] = [];
      calendar[dateKey].push({
        id: meal.id,
        mealType: meal.mealType,
        count: meal.count,
        note: meal.note,
        priceAtTime: meal.priceAtTime,
        amount: new Decimal(meal.priceAtTime).mul(meal.count).toNumber(),
      });
    });

    return calendar;
  }

  async bulkUpdateMeals(userId: string, dto: BulkUpdateDto) {
    const startDate = new Date(dto.startDate + 'T00:00:00.000Z');
    const endDate = new Date(dto.endDate + 'T23:59:59.999Z');

    const where: any = {
      userId,
      status: MealStatus.ACTIVE,
      date: { gte: startDate, lte: endDate },
    };

    if (dto.mealType) {
      where.mealType = dto.mealType;
    }

    const updateData: any = {};
    if (dto.count !== undefined) updateData.count = dto.count;
    if (dto.note !== undefined) updateData.note = dto.note;

    const result = await this.prisma.mealRecord.updateMany({
      where,
      data: updateData,
    });

    if (result.count === 0) {
      throw new BadRequestException(`No active meals found between ${dto.startDate} and ${dto.endDate}${dto.mealType ? ` for meal type ${dto.mealType}` : ''}`);
    }

    return { updated: result.count };
  }

  async bulkCancelMeals(userId: string, dto: BulkDeleteDto) {
    const startDate = new Date(dto.startDate + 'T00:00:00.000Z');
    const endDate = new Date(dto.endDate + 'T23:59:59.999Z');

    const where: any = {
      userId,
      status: MealStatus.ACTIVE,
      date: { gte: startDate, lte: endDate },
    };

    if (dto.mealType) {
      where.mealType = dto.mealType;
    }

    const result = await this.prisma.mealRecord.updateMany({
      where,
      data: { status: MealStatus.CANCELLED },
    });

    if (result.count === 0) {
      throw new BadRequestException(`No active meals found to cancel between ${dto.startDate} and ${dto.endDate}${dto.mealType ? ` for meal type ${dto.mealType}` : ''}`);
    }

    return { cancelled: result.count };
  }

  async getUserDashboard(userId: string) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const meals = await this.prisma.mealRecord.findMany({
      where: { 
        userId, 
        status: MealStatus.ACTIVE,
        date: { lte: today }
      },
      orderBy: { date: 'asc' },
    });

    const totalMeals = meals.reduce((sum, meal) => sum + meal.count, 0);
    const byType = meals.reduce((acc, meal) => {
      acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.count;
      return acc;
    }, {});

    const totalAmount = meals.reduce((sum, meal) => {
      return sum.add(new Decimal(meal.priceAtTime).mul(meal.count));
    }, new Decimal(0));

    const amountByType = meals.reduce((acc, meal) => {
      const amount = new Decimal(meal.priceAtTime).mul(meal.count).toNumber();
      acc[meal.mealType] = (acc[meal.mealType] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalMeals,
      byType,
      totalAmount: totalAmount.toNumber(),
      amountByType,
    };
  }

  async getMonthlyDashboard(userId: string, dto: MonthlyDashboardDto) {
    let year: number, month: number;

    if (dto.month) {
      [year, month] = dto.month.split('-').map(Number);
    } else {
      const now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const finalEndDate = endDate > today ? today : endDate;

    const meals = await this.prisma.mealRecord.findMany({
      where: {
        userId,
        status: MealStatus.ACTIVE,
        date: { gte: startDate, lte: finalEndDate },
      },
      orderBy: { date: 'asc' },
    });

    const totalMeals = meals.reduce((sum, meal) => sum + meal.count, 0);
    const byType = meals.reduce((acc, meal) => {
      acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.count;
      return acc;
    }, {});

    const totalAmount = meals.reduce((sum, meal) => {
      return sum.add(new Decimal(meal.priceAtTime).mul(meal.count));
    }, new Decimal(0));

    const amountByType = meals.reduce((acc, meal) => {
      const amount = new Decimal(meal.priceAtTime).mul(meal.count).toNumber();
      acc[meal.mealType] = (acc[meal.mealType] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    const uniqueDays = new Set(meals.map(meal => meal.date.toISOString().split('T')[0])).size;

    const byWeek = meals.reduce((acc, meal) => {
      const date = new Date(meal.date);
      const weekNum = Math.ceil(date.getDate() / 7);
      if (!acc[weekNum]) acc[weekNum] = { meals: 0, amount: 0 };
      acc[weekNum].meals += meal.count;
      acc[weekNum].amount += new Decimal(meal.priceAtTime).mul(meal.count).toNumber();
      return acc;
    }, {} as Record<number, { meals: number; amount: number }>);

    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      totalMeals,
      byType,
      totalAmount: totalAmount.toNumber(),
      amountByType,
      daysWithMeals: uniqueDays,
      byWeek,
    };
  }

  async getWeeklyDashboard(userId: string, dto: WeeklyDashboardDto) {
    let year: number, week: number;

    if (dto.week) {
      [year, week] = dto.week.split('-W').map(Number);
    } else {
      const now = new Date();
      year = now.getFullYear();
      const firstDayOfYear = new Date(year, 0, 1);
      const pastDaysOfYear = (now.getTime() - firstDayOfYear.getTime()) / 86400000;
      week = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;
    const startDate = new Date(firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const finalEndDate = endDate > today ? today : endDate;

    const meals = await this.prisma.mealRecord.findMany({
      where: {
        userId,
        status: MealStatus.ACTIVE,
        date: { gte: startDate, lte: finalEndDate },
      },
      orderBy: { date: 'asc' },
    });

    const totalMeals = meals.reduce((sum, meal) => sum + meal.count, 0);
    const byType = meals.reduce((acc, meal) => {
      acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.count;
      return acc;
    }, {});

    const totalAmount = meals.reduce((sum, meal) => {
      return sum.add(new Decimal(meal.priceAtTime).mul(meal.count));
    }, new Decimal(0));

    const byDay = meals.reduce((acc, meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!acc[dateKey]) acc[dateKey] = { meals: 0, amount: 0 };
      acc[dateKey].meals += meal.count;
      acc[dateKey].amount += new Decimal(meal.priceAtTime).mul(meal.count).toNumber();
      return acc;
    }, {} as Record<string, { meals: number; amount: number }>);

    return {
      week: `${year}-W${String(week).padStart(2, '0')}`,
      totalMeals,
      byType,
      totalAmount: totalAmount.toNumber(),
      byDay,
    };
  }
}
