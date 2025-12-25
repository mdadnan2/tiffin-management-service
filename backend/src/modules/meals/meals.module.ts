import { Module } from '@nestjs/common';
import { MealsController, DashboardController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  controllers: [MealsController, DashboardController],
  providers: [MealsService],
  exports: [MealsService],
})
export class MealsModule {}
