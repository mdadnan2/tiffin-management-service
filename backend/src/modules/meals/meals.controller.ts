import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { CreateMealDto, UpdateMealDto, BulkMealDto, BulkUpdateDto, BulkDeleteDto, CalendarQueryDto, MonthlyDashboardDto, WeeklyDashboardDto } from './dto/meals.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Meals')
@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  health() {
    return { status: 'ok' };
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create or update meal' })
  @ApiResponse({ status: 201, description: 'Meal created/updated successfully' })
  @UseGuards(AuthGuard('jwt'))
  createMeal(@CurrentUser() user: any, @Body() dto: CreateMealDto) {
    return this.mealsService.createOrUpdateMeal(user.id, dto);
  }

  @Post('bulk')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create bulk meals' })
  @ApiResponse({ status: 201, description: 'Bulk meals created successfully' })
  @UseGuards(AuthGuard('jwt'))
  createBulkMeals(@CurrentUser() user: any, @Body() dto: BulkMealDto) {
    return this.mealsService.createBulkMeals(user.id, dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List meals' })
  @ApiResponse({ status: 200, description: 'Meals retrieved successfully' })
  @UseGuards(AuthGuard('jwt'))
  listMeals(
    @CurrentUser() user: any,
    @Query('date') date?: string,
    @Query('mealType') mealType?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.mealsService.listMeals(user.id, date, mealType, startDate, endDate);
  }

  @Get('calendar')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get calendar view' })
  @ApiResponse({ status: 200, description: 'Calendar retrieved successfully' })
  @UseGuards(AuthGuard('jwt'))
  getCalendar(@CurrentUser() user: any, @Query() query: CalendarQueryDto) {
    return this.mealsService.getCalendar(user.id, query);
  }

  @Patch('bulk')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk update meals' })
  @ApiResponse({ status: 200, description: 'Meals updated successfully' })
  @UseGuards(AuthGuard('jwt'))
  bulkUpdateMeals(@CurrentUser() user: any, @Body() dto: BulkUpdateDto) {
    return this.mealsService.bulkUpdateMeals(user.id, dto);
  }

  @Delete('bulk')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bulk cancel meals' })
  @ApiResponse({ status: 200, description: 'Meals cancelled successfully' })
  @UseGuards(AuthGuard('jwt'))
  bulkCancelMeals(@CurrentUser() user: any, @Body() dto: BulkDeleteDto) {
    return this.mealsService.bulkCancelMeals(user.id, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update meal' })
  @ApiResponse({ status: 200, description: 'Meal updated successfully' })
  @UseGuards(AuthGuard('jwt'))
  updateMeal(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateMealDto) {
    return this.mealsService.updateMeal(user.id, id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel meal' })
  @ApiResponse({ status: 200, description: 'Meal cancelled successfully' })
  @UseGuards(AuthGuard('jwt'))
  cancelMeal(@CurrentUser() user: any, @Param('id') id: string) {
    return this.mealsService.cancelMeal(user.id, id);
  }
}

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private mealsService: MealsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user dashboard' })
  @ApiResponse({ status: 200, description: 'Dashboard retrieved successfully' })
  @UseGuards(AuthGuard('jwt'))
  getDashboard(@CurrentUser() user: any) {
    return this.mealsService.getUserDashboard(user.id);
  }

  @Get('monthly')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get monthly dashboard' })
  @ApiResponse({ status: 200, description: 'Monthly dashboard retrieved' })
  @UseGuards(AuthGuard('jwt'))
  getMonthlyDashboard(@CurrentUser() user: any, @Query() query: MonthlyDashboardDto) {
    return this.mealsService.getMonthlyDashboard(user.id, query);
  }

  @Get('weekly')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get weekly dashboard' })
  @ApiResponse({ status: 200, description: 'Weekly dashboard retrieved' })
  @UseGuards(AuthGuard('jwt'))
  getWeeklyDashboard(@CurrentUser() user: any, @Query() query: WeeklyDashboardDto) {
    return this.mealsService.getWeeklyDashboard(user.id, query);
  }
}
