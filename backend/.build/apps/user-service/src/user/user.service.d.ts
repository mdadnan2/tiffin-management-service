import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    listUsers(): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
}
