import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ERRORS } from 'src/utils/errors';
import { UserService } from '../users/user.service';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.getByLogin(login);
    if (user) {
      if (await compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      } else throw new ForbiddenException(ERRORS.WRONG_PASSWORD);
    } else throw new ForbiddenException(ERRORS.WRONG_LOGIN);
  }

  async login(user: any) {
    const payload = { login: user.login, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
