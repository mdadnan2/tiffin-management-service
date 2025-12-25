import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdatePriceDto } from './dto/users.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  health() {
    return { status: 'ok' };
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @UseGuards(AuthGuard('jwt'))
  getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'Users list retrieved' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  listUsers() {
    return this.usersService.listUsers();
  }

  @Get('me/price')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my meal prices' })
  @ApiResponse({ status: 200, description: 'Price settings retrieved' })
  @UseGuards(AuthGuard('jwt'))
  getMyPrice(@CurrentUser() user: any) {
    return this.usersService.getPrice(user.id);
  }

  @Patch('me/price')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update my meal prices' })
  @ApiResponse({ status: 200, description: 'Price settings updated' })
  @UseGuards(AuthGuard('jwt'))
  updateMyPrice(@CurrentUser() user: any, @Body() dto: UpdatePriceDto) {
    return this.usersService.updatePrice(user.id, dto);
  }
}
