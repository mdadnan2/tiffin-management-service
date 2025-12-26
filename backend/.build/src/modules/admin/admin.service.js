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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const meals = await this.prisma.mealRecord.findMany({
                where: { userId: user.id, status: client_1.MealStatus.ACTIVE },
            });
            const mealCount = meals.reduce((sum, meal) => sum + meal.count, 0);
            const totalAmount = meals.reduce((sum, meal) => {
                return sum.add(new library_1.Decimal(meal.priceAtTime).mul(meal.count));
            }, new library_1.Decimal(0));
            return {
                ...user,
                mealCount,
                totalAmount: totalAmount.toNumber(),
            };
        }));
        return usersWithStats;
    }
    async getUserSummary(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID '${userId}' not found`);
        }
        const meals = await this.prisma.mealRecord.findMany({
            where: { userId, status: client_1.MealStatus.ACTIVE },
        });
        const totalMeals = meals.reduce((sum, meal) => sum + meal.count, 0);
        const byType = meals.reduce((acc, meal) => {
            acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.count;
            return acc;
        }, {});
        const totalAmount = meals.reduce((sum, meal) => {
            return sum.add(new library_1.Decimal(meal.priceAtTime).mul(meal.count));
        }, new library_1.Decimal(0));
        return {
            user,
            totalMeals,
            byType,
            totalAmount: totalAmount.toNumber(),
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map