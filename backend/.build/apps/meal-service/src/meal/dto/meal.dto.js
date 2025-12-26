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
exports.UpdateMealDto = exports.CreateMealDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateMealDto {
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MealType, example: 'LUNCH' }),
    (0, class_validator_1.IsEnum)(client_1.MealType),
    __metadata("design:type", String)
], CreateMealDto.prototype, "mealType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateMealDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Extra spicy', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "note", void 0);
class UpdateMealDto {
}
exports.UpdateMealDto = UpdateMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateMealDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated note', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMealDto.prototype, "note", void 0);
//# sourceMappingURL=meal.dto.js.map