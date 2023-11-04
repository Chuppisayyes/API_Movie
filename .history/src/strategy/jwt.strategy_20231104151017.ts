/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../modules/users/users.service';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    const { tai_khoan } = payload; // Lấy 'tai_khoan' từ payload của token
    const user = await this.usersService.thongTinTaiKhoanByToken(tai_khoan);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
