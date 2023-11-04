import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { thongTinTaiKhoanByToken } from ''

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UseService,
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
