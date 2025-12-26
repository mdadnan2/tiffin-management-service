import { PrismaService } from '../prisma/prisma.service';
import { MonthlyDashboardDto, WeeklyDashboardDto } from './dto/dashboard.dto';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserDashboard(userId: string): Promise<{
        totalMeals: number;
        byType: {};
        totalAmount: number;
        amountByType: Record<string, number>;
    }>;
    getMonthlyDashboard(userId: string, dto: MonthlyDashboardDto): Promise<{
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
    getWeeklyDashboard(userId: string, dto: WeeklyDashboardDto): Promise<{
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
