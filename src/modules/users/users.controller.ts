import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsers() {
    return await this.userService.getAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.userService.getById(id);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.userService.deleteUser(id);
  }
}
