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
exports.PriceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const price_service_1 = require("./price.service");
const price_dto_1 = require("./dto/price.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const common_2 = require("@app/common");
let PriceController = class PriceController {
    constructor(priceService) {
        this.priceService = priceService;
    }
    getMyPrice(user) {
        return this.priceService.getPrice(user.id || user.sub);
    }
    updateMyPrice(user, dto) {
        return this.priceService.updatePrice(user.id || user.sub, dto);
    }
    getUserPrice(userId) {
        return this.priceService.getPrice(userId);
    }
};
exports.PriceController = PriceController;
__decorate([
    (0, common_1.Get)('users/me/price'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get my meal prices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Price settings retrieved' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "getMyPrice", null);
__decorate([
    (0, common_1.Patch)('users/me/price'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update my meal prices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Price settings updated' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_2.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, price_dto_1.UpdatePriceDto]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "updateMyPrice", null);
__decorate([
    (0, common_1.Get)('admin/users/:userId/price'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user meal prices (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Price settings retrieved' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PriceController.prototype, "getUserPrice", null);
exports.PriceController = PriceController = __decorate([
    (0, swagger_1.ApiTags)('Price Settings'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [price_service_1.PriceService])
], PriceController);
//# sourceMappingURL=price.controller.js.map