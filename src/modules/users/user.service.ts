import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ERRORS } from '../../utils/errors';
import { db } from 'src/db';

@Injectable()
export class UserService {
  private db = db;

  createUser(user: CreateUserDto) {
    const newUser: User = new User({
      id: v4(),
      login: user.login,
      password: user.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    });
    this.db.addUser(newUser);
    return newUser;
  }

  updatePassword(id: string, updatePassword: UpdatePasswordDto) {
    const updatingUser = this.db.getUser(id);

    if (!updatingUser) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    if (updatingUser.password !== updatePassword.oldPassword) {
      throw new ForbiddenException(ERRORS.WRONG_OLD_PASSWORD);
    } else {
      updatingUser.password = updatePassword.newPassword;
      updatingUser.version += 1;
      updatingUser.updatedAt = Date.now();
    }
    return updatingUser;
  }

  deleteUser(id: string) {
    const user = this.db.getUser(id);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    this.db.deleteUser(id);
  }

  getById(id: string) {
    const user = this.db.getUser(id);
    if (!user) {
      throw new NotFoundException(ERRORS.USER_NOT_FOUND);
    }
    return user;
  }

  getAll() {
    return this.db.getUsers();
  }
}
