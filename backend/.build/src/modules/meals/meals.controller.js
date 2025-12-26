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
exports.DashboardController = exports.MealsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const meals_service_1 = require("./meals.service");
const meals_dto_1 = require("./dto/meals.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let MealsController = class MealsController {
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    health() {
        return { status: 'ok' };
    }
    createMeal(user, dto) {
        return this.mealsService.createOrUpdateMeal(user.id, dto);
    }
    createBulkMeals(user, dto) {
        return this.mealsService.createBulkMeals(user.id, dto);
    }
    listMeals(user, date, mealType, startDate, endDate) {
        return this.mealsService.listMeals(user.id, date, mealType, startDate, endDate);
    }
    getCalendar(user, query) {
        return this.mealsService.getCalendar(user.id, query);
    }
    bulkUpdateMeals(user, dto) {
        return this.mealsService.bulkUpdateMeals(user.id, dto);
    }
    bulkCancelMeals(user, dto) {
        return this.mealsService.bulkCancelMeals(user.id, dto);
    }
    updateMeal(user, id, dto) {
        return this.mealsService.updateMeal(user.id, id, dto);
    }
    cancelMeal(user, id) {
        return this.mealsService.cancelMeal(user.id, id);
    }
};
exports.MealsController = MealsController;
__decorate([
    (0, common_1.Get)('health'),
    (0, swagger_1.ApiOperation)({ summary: 'Health check' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service is healthy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "health", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update meal' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Meal created/updated successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.CreateMealDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "createMeal", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create bulk meals' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bulk meals created successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.BulkMealDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "createBulkMeals", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'List meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals retrieved successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('mealType')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "listMeals", null);
__decorate([
    (0, common_1.Get)('calendar'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get calendar view' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Calendar retrieved successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.CalendarQueryDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "getCalendar", null);
__decorate([
    (0, common_1.Patch)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk update meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals updated successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.BulkUpdateDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "bulkUpdateMeals", null);
__decorate([
    (0, common_1.Delete)('bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk cancel meals' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meals cancelled successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.BulkDeleteDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "bulkCancelMeals", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update meal' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meal updated successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, meals_dto_1.UpdateMealDto]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "updateMeal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel meal' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Meal cancelled successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MealsController.prototype, "cancelMeal", null);
exports.MealsController = MealsController = __decorate([
    (0, swagger_1.ApiTags)('Meals'),
    (0, common_1.Controller)('meals'),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], MealsController);
let DashboardController = class DashboardController {
    constructor(mealsService) {
        this.mealsService = mealsService;
    }
    getDashboard(user) {
        return this.mealsService.getUserDashboard(user.id);
    }
    getMonthlyDashboard(user, query) {
        return this.mealsService.getMonthlyDashboard(user.id, query);
    }
    getWeeklyDashboard(user, query) {
        return this.mealsService.getWeeklyDashboard(user.id, query);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard retrieved successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('monthly'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monthly dashboard retrieved' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.MonthlyDashboardDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMonthlyDashboard", null);
__decorate([
    (0, common_1.Get)('weekly'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get weekly dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Weekly dashboard retrieved' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, meals_dto_1.WeeklyDashboardDto]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getWeeklyDashboard", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [meals_service_1.MealsService])
], DashboardController);
//# sourceMappingURL=meals.controller.js.map