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
exports.WeeklyDashboardDto = exports.MonthlyDashboardDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class MonthlyDashboardDto {
}
exports.MonthlyDashboardDto = MonthlyDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01', description: 'Month in YYYY-MM format', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}$/, { message: 'month must be in YYYY-MM format' }),
    __metadata("design:type", String)
], MonthlyDashboardDto.prototype, "month", void 0);
class WeeklyDashboardDto {
}
exports.WeeklyDashboardDto = WeeklyDashboardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-W03', description: 'Week in YYYY-Www format', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-W\d{2}$/, { message: 'week must be in YYYY-Www format' }),
    __metadata("design:type", String)
], WeeklyDashboardDto.prototype, "week", void 0);
//# sourceMappingURL=dashboard.dto.js.map