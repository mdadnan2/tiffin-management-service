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
exports.PriceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let PriceService = class PriceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPrice(userId) {
        let price = await this.prisma.priceSetting.findUnique({ where: { userId } });
        if (!price) {
            price = await this.prisma.priceSetting.create({
                data: { userId },
            });
        }
        return price;
    }
    async updatePrice(userId, dto) {
        const data = {};
        if (dto.breakfast !== undefined) {
            if (dto.breakfast < 0)
                throw new common_1.BadRequestException('Breakfast price cannot be negative');
            data.breakfast = new library_1.Decimal(dto.breakfast);
        }
        if (dto.lunch !== undefined) {
            if (dto.lunch < 0)
                throw new common_1.BadRequestException('Lunch price cannot be negative');
            data.lunch = new library_1.Decimal(dto.lunch);
        }
        if (dto.dinner !== undefined) {
            if (dto.dinner < 0)
                throw new common_1.BadRequestException('Dinner price cannot be negative');
            data.dinner = new library_1.Decimal(dto.dinner);
        }
        if (dto.custom !== undefined) {
            if (dto.custom < 0)
                throw new common_1.BadRequestException('Custom price cannot be negative');
            data.custom = new library_1.Decimal(dto.custom);
        }
        return this.prisma.priceSetting.upsert({
            where: { userId },
            update: data,
            create: { userId, ...data },
        });
    }
};
exports.PriceService = PriceService;
exports.PriceService = PriceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PriceService);
//# sourceMappingURL=price.service.js.map