import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Public()
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: CreateUserDto) {
    return await this.authService.login(user);
  }
  @Public()
  @Post('refresh')
  async refresh(@Body() refreshToken: string) {
    return;
  }
}
