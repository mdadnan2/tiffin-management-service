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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const meal_service_1 = require("./meal.service");
const meal_dto_1 = require("./dto/meal.dto");
const bulk_meal_dto_1 = require("./dto/bulk-meal.dto");
const bulk_operations_dto_1 = require("./dto/bulk-operations.dto");
const calendar_dto_1 = require("./dto/calendar.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_2 = require("@app/common");
let MealController = class MealController {
    constructor(mealService) {
        this.mealService = mealService;
    }
    health() {
        return { status: 'ok' };
    }
    createMeal(user, dto) {
        return this.mealService.createOrUpdateMeal(user.id || user.sub, dto);
    }
    createBulkMeals(user, dto) {
        return this.mealService.createBulkMeals(user.id || user.sub, dto);
    }
    listMeals(user, date, mealType, startDate, endDate) {
        return this.mealService.listMeals(user.id || user.sub, date, mealType, startDate, endDate);
    }
    getCalendar(user, query) {
        return this.mealService.getCalendar(user.id || user.sub, query);
    }
    bulkUpdateMeals(user, dto) {
        console.log('🎯 Bulk Update Request Received');
        console.log('User:', user);
        console.log('DTO:', dto);
        return this.mealService.bulkUpdateMeals(user.id || user.sub, dto);
    }
    bulkCancelMeals(user, dto) {
        return this.mealService.bulkCancelMeals(user.id || user.sub, dto);
    }
    updateMeal(user, id, dto) {
        return this.mealService.updateMeal(user.id || user.sub, id, dto);
    }
    cancelMeal(user, id) {
        return this.mealService.cancelMeal(user.id || user.sub, id);
    }
};
exports.MealController = MealController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealController.prototype, "health", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update meal' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Meal created/updated successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meal_dto_1.CreateMealDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "createMeal", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create bulk meals' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bulk meals created successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_meal_dto_1.BulkMealDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "createBulkMeals", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals retrieved successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('mealType')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "listMeals", null);
__decorate([
    (0, common_1.Get)('calendar'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get calendar view' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Calendar retrieved successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calendar_dto_1.CalendarQueryDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "getCalendar", null);
__decorate([
    (0, common_1.Patch)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals updated successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_operations_dto_1.BulkUpdateDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "bulkUpdateMeals", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk cancel meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals cancelled successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bulk_operations_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "bulkCancelMeals", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update meal' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meal updated successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, meal_dto_1.UpdateMealDto]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "updateMeal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel meal' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meal cancelled successfully' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MealController.prototype, "cancelMeal", null);
exports.MealController = MealController = __decorate([
    (0, swagger_1.ApiTags)('Meals'),
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meal_service_1.MealService])
], MealController);
//# sourceMappingURL=meal.controller.js.map