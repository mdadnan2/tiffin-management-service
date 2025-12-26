import { DashboardService } from './dashboard.service';
import { MonthlyDashboardDto, WeeklyDashboardDto } from './dto/dashboard.dto';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(user: any): Promise<{
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
    }>;
    health(): {
        status: string;
    };
    getMonthlyDashboard(user: any, query: MonthlyDashboardDto): Promise<{
        month: string;
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
        daysWithMeals: number;
        byWeek: Record<number, {
            meals: number;
            amount: number;
        }>;
    }>;
    getWeeklyDashboard(user: any, query: WeeklyDashboardDto): Promise<{
        week: string;
        totalMeals: number;
        byType: {};
        totalAmount: number;
        byDay: Record<string, {
            meals: number;
            amount: number;
        }>;
    }>;
}
