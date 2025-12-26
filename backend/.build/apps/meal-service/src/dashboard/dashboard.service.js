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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserDashboard(userId) {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const meals = await this.prisma.mealRecord.findMany({
            where: {
                userId,
                status: client_1.MealStatus.ACTIVE,
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
            const price = new library_1.Decimal(meal.priceAtTime);
            const count = new library_1.Decimal(meal.count);
            return sum.add(price.mul(count));
        }, new library_1.Decimal(0));
        const amountByType = meals.reduce((acc, meal) => {
            const amount = new library_1.Decimal(meal.priceAtTime).mul(meal.count).toNumber();
            acc[meal.mealType] = (acc[meal.mealType] || 0) + amount;
            return acc;
        }, {});
        return {
            totalMeals,
            byType,
            totalAmount: totalAmount.toNumber(),
            amountByType,
        };
    }
    async getMonthlyDashboard(userId, dto) {
        let year, month;
        if (dto.month) {
            [year, month] = dto.month.split('-').map(Number);
        }
        else {
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
                status: client_1.MealStatus.ACTIVE,
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
            return sum.add(new library_1.Decimal(meal.priceAtTime).mul(meal.count));
        }, new library_1.Decimal(0));
        const amountByType = meals.reduce((acc, meal) => {
            const amount = new library_1.Decimal(meal.priceAtTime).mul(meal.count).toNumber();
            acc[meal.mealType] = (acc[meal.mealType] || 0) + amount;
            return acc;
        }, {});
        const uniqueDays = new Set(meals.map(meal => meal.date.toISOString().split('T')[0])).size;
        const byWeek = meals.reduce((acc, meal) => {
            const date = new Date(meal.date);
            const weekNum = Math.ceil(date.getDate() / 7);
            if (!acc[weekNum])
                acc[weekNum] = { meals: 0, amount: 0 };
            acc[weekNum].meals += meal.count;
            acc[weekNum].amount += new library_1.Decimal(meal.priceAtTime).mul(meal.count).toNumber();
            return acc;
        }, {});
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
    async getWeeklyDashboard(userId, dto) {
        let year, week;
        if (dto.week) {
            [year, week] = dto.week.split('-W').map(Number);
        }
        else {
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
                status: client_1.MealStatus.ACTIVE,
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
            return sum.add(new library_1.Decimal(meal.priceAtTime).mul(meal.count));
        }, new library_1.Decimal(0));
        const byDay = meals.reduce((acc, meal) => {
            const dateKey = meal.date.toISOString().split('T')[0];
            if (!acc[dateKey])
                acc[dateKey] = { meals: 0, amount: 0 };
            acc[dateKey].meals += meal.count;
            acc[dateKey].amount += new library_1.Decimal(meal.priceAtTime).mul(meal.count).toNumber();
            return acc;
        }, {});
        return {
            week: `${year}-W${String(week).padStart(2, '0')}`,
            totalMeals,
            byType,
            totalAmount: totalAmount.toNumber(),
            byDay,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map