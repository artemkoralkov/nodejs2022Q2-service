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
import { compare, hash } from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    userDto.password = await hash(userDto.password, +process.env.CRYPT_SALT);
    const user = this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }

  async updatePassword(id: string, updatePassword: UpdatePasswordDto) {
    const updatingUser = await this.getById(id);

    if (!updatingUser) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    if (!(await compare(updatePassword.oldPassword, updatingUser.password))) {
      throw new ForbiddenException(ERRORS.WRONG_OLD_PASSWORD);
    } else {
      const userUpdate: Partial<UserEntity> = {
        password: await hash(
          updatePassword.newPassword,
          +process.env.CRYPT_SALT,
        ),
      };
      await this.usersRepository.update(id, userUpdate);
    }
    return this.getById(id);
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.delete(id);
    if (!user.affected) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
  }

  async getByLogin(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  async getAll() {
    return await this.usersRepository.find();
  }
}
