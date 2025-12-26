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
exports.BulkMealDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class BulkMealDto {
}
exports.BulkMealDto = BulkMealDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['2024-01-15', '2024-01-16'], required: false }),
    (0, class_validator_1.ValidateIf)(o => !o.startDate && !o.endDate),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDateString)({}, { each: true }),
    __metadata("design:type", Array)
], BulkMealDto.prototype, "dates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15', required: false }),
    (0, class_validator_1.ValidateIf)(o => !o.dates),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkMealDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-19', required: false }),
    (0, class_validator_1.ValidateIf)(o => !o.dates),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkMealDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 2, 3, 4, 5], description: '0=Sunday, 1=Monday, ..., 6=Saturday', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(7),
    __metadata("design:type", Array)
], BulkMealDto.prototype, "daysOfWeek", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BulkMealDto.prototype, "skipWeekends", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MealType, example: 'LUNCH' }),
    (0, class_validator_1.IsEnum)(client_1.MealType),
    __metadata("design:type", String)
], BulkMealDto.prototype, "mealType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BulkMealDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Weekly lunch', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkMealDto.prototype, "note", void 0);
//# sourceMappingURL=bulk-meal.dto.js.map