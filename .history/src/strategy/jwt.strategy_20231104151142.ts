
Nếu bạn muốn sửa lớp JwtStrategy để phù hợp với việc trả về thông tin người dùng dựa trên token, bạn có thể thực hiện như sau:

typescript
Copy code
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';

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
Trong trường hợp này, lớp JwtStrategy đã được cải tiến để sử dụng UsersService để lấy thông tin người dùng dựa trên tai_khoan từ payload của token và trả về người dùng đã được xác thực.




User
    throw new UnauthorizedException();
lỗi
ChatGPT
Lỗi throw new UnauthorizedException(); xuất hiện vì UnauthorizedException không được tìm thấy trong phạm vi của lớp JwtStrategy. Để sửa lỗi này, bạn cần nhập UnauthorizedException từ '@nestjs/common' như sau:

typescript
Copy code
import { UnauthorizedException } from '@nestjs/common';
Sau đó, bạn có thể sử dụng UnauthorizedException như trong mã trước:

typescript
Copy code
if (!user) {
  throw new UnauthorizedException();
}
Nếu bạn gặp vấn đề khác, hãy kiểm tra xem tất cả các import và phạm vi có được cấu hình đúng cách.





