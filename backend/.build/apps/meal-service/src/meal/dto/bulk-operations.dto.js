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
exports.BulkDeleteDto = exports.BulkUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class BulkUpdateDto {
}
exports.BulkUpdateDto = BulkUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkUpdateDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-19' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkUpdateDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MealType, example: 'LUNCH', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MealType),
    __metadata("design:type", String)
], BulkUpdateDto.prototype, "mealType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BulkUpdateDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated for the week', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BulkUpdateDto.prototype, "note", void 0);
class BulkDeleteDto {
}
exports.BulkDeleteDto = BulkDeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkDeleteDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-19' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BulkDeleteDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.MealType, example: 'LUNCH', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.MealType),
    __metadata("design:type", String)
], BulkDeleteDto.prototype, "mealType", void 0);
//# sourceMappingURL=bulk-operations.dto.js.map