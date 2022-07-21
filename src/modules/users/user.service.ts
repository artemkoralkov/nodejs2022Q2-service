import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ERRORS } from '../../utils/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    console.log(Date.now());
    const newUser = {
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      login: userDto.login,
      password: userDto.password,
    };
    console.log('dsadasdasdasd');
    const user = this.usersRepository.create(newUser);
    return (await this.usersRepository.save(user)).toResponse();
  }

  async updatePassword(id: string, updatePassword: UpdatePasswordDto) {
    const updatingUser = await this.usersRepository.findOne({ where: { id } });

    if (!updatingUser) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    if (updatingUser.password !== updatePassword.oldPassword) {
      throw new ForbiddenException(ERRORS.WRONG_OLD_PASSWORD);
    } else {
      updatingUser.password = updatePassword.newPassword;
      updatingUser.updatedAt = Date.now();
      updatingUser.version += 1;
      await this.usersRepository.update(id, updatingUser);
    }
    return updatingUser.toResponse();
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.delete(id);
    if (user.affected === 0) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return user.toResponse();
  }

  async getAll() {
    return (await this.usersRepository.find()).map((user) => user.toResponse());
  }
}
