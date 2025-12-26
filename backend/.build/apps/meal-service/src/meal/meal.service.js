"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let MealService = class MealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdateMeal(userId, dto) {
        const priceSettings = await this.prisma.priceSetting.findUnique({ where: { userId } });
        const priceAtTime = priceSettings?.[dto.mealType.toLowerCase()] || new library_1.Decimal(0);
        const meal = await this.prisma.mealRecord.upsert({
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
                status: client_1.MealStatus.ACTIVE,
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
        return meal;
    }
    async createBulkMeals(userId, dto) {
        let dates;
        if (dto.dates) {
            dates = dto.dates;
        }
        else if (dto.startDate && dto.endDate) {
            dates = this.generateDateRange(dto.startDate, dto.endDate, dto.daysOfWeek, dto.skipWeekends);
        }
        else {
            throw new common_1.BadRequestException('Invalid bulk meal request: Provide either "dates" array or "startDate" and "endDate"');
        }
        const priceSettings = await this.prisma.priceSetting.findUnique({ where: { userId } });
        const priceAtTime = priceSettings?.[dto.mealType.toLowerCase()] || new library_1.Decimal(0);
        const meals = await Promise.all(dates.map(date => this.prisma.mealRecord.upsert({
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
                status: client_1.MealStatus.ACTIVE,
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
        })));
        return { created: meals.length, meals };
    }
    generateDateRange(startDate, endDate, daysOfWeek, skipWeekends) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start > end) {
            throw new common_1.BadRequestException(`Invalid date range: startDate (${startDate}) must be before or equal to endDate (${endDate})`);
        }
        const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff > 90) {
            throw new common_1.BadRequestException(`Date range too large: ${daysDiff} days. Maximum allowed is 90 days`);
        }
        if (daysOfWeek) {
            const invalidDays = daysOfWeek.filter(d => d < 0 || d > 6);
            if (invalidDays.length > 0) {
                throw new common_1.BadRequestException(`Invalid daysOfWeek values: [${invalidDays.join(', ')}]. Must be between 0 (Sunday) and 6 (Saturday)`);
            }
        }
        const dates = [];
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
    async listMeals(userId, date, mealType, startDate, endDate) {
        const where = { userId, status: client_1.MealStatus.ACTIVE };
        if (date)
            where.date = new Date(date);
        if (mealType)
            where.mealType = mealType;
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        return this.prisma.mealRecord.findMany({ where, orderBy: { date: 'desc' } });
    }
    async updateMeal(userId, mealId, dto) {
        const meal = await this.prisma.mealRecord.findUnique({ where: { id: mealId } });
        if (!meal) {
            throw new common_1.BadRequestException(`Meal with ID '${mealId}' not found`);
        }
        if (meal.userId !== userId) {
            throw new common_1.BadRequestException('You do not have permission to update this meal');
        }
        return this.prisma.mealRecord.update({
            where: { id: mealId },
            data: { count: dto.count, note: dto.note },
        });
    }
    async cancelMeal(userId, mealId) {
        const meal = await this.prisma.mealRecord.findUnique({ where: { id: mealId } });
        if (!meal) {
            throw new common_1.BadRequestException(`Meal with ID '${mealId}' not found`);
        }
        if (meal.userId !== userId) {
            throw new common_1.BadRequestException('You do not have permission to cancel this meal');
        }
        return this.prisma.mealRecord.update({
            where: { id: mealId },
            data: { status: client_1.MealStatus.CANCELLED },
        });
    }
    async getCalendar(userId, query) {
        let startDate;
        let endDate;
        if (query.month) {
            const [year, month] = query.month.split('-').map(Number);
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
        }
        else if (query.week) {
            const [year, week] = query.week.split('-W').map(Number);
            const firstDayOfYear = new Date(year, 0, 1);
            const daysOffset = (week - 1) * 7;
            startDate = new Date(firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);
            endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
        }
        else {
            const now = new Date();
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        }
        const meals = await this.prisma.mealRecord.findMany({
            where: {
                userId,
                status: client_1.MealStatus.ACTIVE,
                date: { gte: startDate, lte: endDate },
            },
            orderBy: { date: 'asc' },
        });
        const calendar = {};
        meals.forEach(meal => {
            const dateKey = meal.date.toISOString().split('T')[0];
            if (!calendar[dateKey])
                calendar[dateKey] = [];
            calendar[dateKey].push({
                id: meal.id,
                mealType: meal.mealType,
                count: meal.count,
                note: meal.note,
                priceAtTime: meal.priceAtTime,
                amount: new library_1.Decimal(meal.priceAtTime).mul(meal.count).toNumber(),
            });
        });
        return calendar;
    }
    async bulkUpdateMeals(userId, dto) {
        const startDate = new Date(dto.startDate + 'T00:00:00.000Z');
        const endDate = new Date(dto.endDate + 'T23:59:59.999Z');
        const where = {
            userId,
            status: client_1.MealStatus.ACTIVE,
            date: {
                gte: startDate,
                lte: endDate,
            },
        };
        if (dto.mealType) {
            where.mealType = dto.mealType;
        }
        const updateData = {};
        if (dto.count !== undefined)
            updateData.count = dto.count;
        if (dto.note !== undefined)
            updateData.note = dto.note;
        const result = await this.prisma.mealRecord.updateMany({
            where,
            data: updateData,
        });
        if (result.count === 0) {
            throw new common_1.BadRequestException(`No active meals found between ${dto.startDate} and ${dto.endDate}${dto.mealType ? ` for meal type ${dto.mealType}` : ''}`);
        }
        return { updated: result.count };
    }
    async bulkCancelMeals(userId, dto) {
        const startDate = new Date(dto.startDate + 'T00:00:00.000Z');
        const endDate = new Date(dto.endDate + 'T23:59:59.999Z');
        const where = {
            userId,
            status: client_1.MealStatus.ACTIVE,
            date: {
                gte: startDate,
                lte: endDate,
            },
        };
        if (dto.mealType) {
            where.mealType = dto.mealType;
        }
        const result = await this.prisma.mealRecord.updateMany({
            where,
            data: { status: client_1.MealStatus.CANCELLED },
        });
        if (result.count === 0) {
            throw new common_1.BadRequestException(`No active meals found to cancel between ${dto.startDate} and ${dto.endDate}${dto.mealType ? ` for meal type ${dto.mealType}` : ''}`);
        }
        return { cancelled: result.count };
    }
};
exports.MealService = MealService;
exports.MealService = MealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealService);
//# sourceMappingURL=meal.service.js.map