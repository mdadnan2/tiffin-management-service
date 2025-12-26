import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    health(): {
        status: string;
    };
    getProfile(user: any): Promise<{
        id: string;
        name: string;
        email: string;
        mobile: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateUserDto): Promise<{
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
