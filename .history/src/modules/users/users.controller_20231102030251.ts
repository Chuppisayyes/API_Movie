import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Headers,
  HttpException
} from '@nestjs/common';
import { NguoiDung } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DangNhapDto, TimKiemNguoiDungDto } from './dto/users.dto';

@ApiTags('quản lý người dùng')
@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layDanhSachLoaiNguoiDung')
  async LayDanhSachLoaiNguoiDung(
    @Headers('authorization') auth: string
  ):Promise<any> {
    try {
      console.log(auth)
      return await this.usersService.layDanhSachLoaiNguoiDung();
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  @ApiBody({
    description: 'Đăng nhập',
    type: DangNhapDto,
  })
  @Post('/dangNhap')
  dangNhap(@Body() body: NguoiDung) {
    return this.usersService.dangNhap(body);
  }

  @Post('/dangKy')
  dangKy(@Body() body: NguoiDung) {
    return this.usersService.dangKy(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/layDanhSachNguoiDung')
  layDanhSachNguoiDung() {
    return this.usersService.layDanhSachNguoiDung();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/layDanhSachNguoiDungPhanTrang')
  layDanhSachNguoiDungPhanTrang(
    @Query('soTrang') soTrang: number,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number,
  ) {
    return this.usersService.layDanhSachNguoiDungPhanTrang(
      Number(soTrang),
      Number(soPhanTuTrenTrang),
    );
  }

  @ApiBody({
    description: 'Tìm kiếm người dùng',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/timKiemNguoiDung')
  timKiemNguoiDung(@Body() body: nguoiDung) {
    return this.usersService.timKiemNguoiDung(body);
  }

  @ApiBody({
    description: 'Tìm kiếm người dùng phân trang',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/timKiemNguoiDungPhanTrang')
  timKiemNguoiDungPhanTrang(
    @Body() body: NguoiDung,
    @Query('soTrang') soTrang: number,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number,
  ) {
    return this.usersService.timKiemNguoiDungPhanTrang(
      body,
      Number(soTrang),
      Number(soPhanTuTrenTrang),
    );
  }

  @ApiBody({
    description: 'Tìm kiếm thông tin tài khoản',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/thongTinTaiKhoan/:id')
  thongTinTaiKhoan(@Body() body: NguoiDung, @Param('id') id: string) {
    return this.usersService.thongTinTaiKhoan(body, id.toString());
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/layThongTinNguoiDung/:id')
  layThongTinNguoiDung(@Param('id') id: string) {
    return this.usersService.layThongTinNguoiDung(id.toString());
  }

  @ApiBody({
    description: 'Thêm người dùng',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/themNguoiDung')
  themNguoiDung(@Body() body: nguoiDung) {
    return this.usersService.themNguoiDung(body);
  }

  @ApiBody({
    description: 'Cập nhật thông tin người dùng',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put('/capNhatThongTinNguoiDung/:id')
  capNhatThongTinNguoiDungByIdParam(
    @Body() body: nguoiDung,
    @Param('id') id: string,
  ) {
    return this.usersService.capNhatThongTinNguoiDungByIdParam(
      body,
      Number(id),
    );
  }

  @ApiBody({
    description: 'Cập nhật thông tin người dùng',
    type: TimKiemNguoiDungDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/capNhatThongTinNguoiDung')
  capNhatThongTinNguoiDung(@Body() body: nguoiDung) {
    return this.usersService.capNhatThongTinNguoiDung(
      body,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/xoaNguoiDung/:id')
  XoaNguoiDung(@Param('id') id: string) {
    return this.usersService.xoaNguoiDung(Number(id));
  }
}
