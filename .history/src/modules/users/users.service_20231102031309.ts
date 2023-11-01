
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigServicegService
  ) { }
  async layDanhSachLoaiNguoiDung() {
    try {
      const nguoiDung = (await prisma.nguoiDung.findMany()).map(
        (item: any) => item.loai_nguoi_dung,
      );
      return [...new Set(nguoiDung)];
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async dangNhap(body: NguoiDung) {
    try {
      const { email, mat_khau } = body;
      const checkUser = await prisma.nguoiDung.findFirst({
        where: {
          email,
        },
      });
      if (checkUser) {
        const checkPass = await bcrypt.compare(mat_khau, checkUser.mat_khau);
        const token = this.jwtService.sign({
          data: 'node 29'
        }, {
          secret: this.config.get("SECRET_KEY"),
          expiresIn: "8h"
        }
        );

        if (checkPass) {
          console.log('pass')
          return token;
        } else {
          return 'Wrong password';
        }
      } else {
        return 'Email not found';
      }
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async dangKy(body: NguoiDung) {
    try {
      const { ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = body;
      const hashPass = await bcrypt.hash(mat_khau, 10);
      await prisma.nguoiDung.create({
        data: {
          ho_ten,
          email,
          so_dt,
          loai_nguoi_dung,
          mat_khau: hashPass,
        },
      });
      return 'Đăng  ký thành công';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async layDanhSachNguoiDung() {
    try {
      const user = await prisma.nguoiDung.findMany();
      return user;
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async layDanhSachNguoiDungPhanTrang(
    soTrang: number,
    soPhanTuTrenTrang: number,
  ) {
    try {
      if (!soTrang) {
        return 'hãy nhập só trang';
      }
      if (!soPhanTuTrenTrang) {
        return 'hãy nhập só phần tử trên trang';
      }
      if (soTrang && soPhanTuTrenTrang) {
        const users = await prisma.nguoiDung.findMany();
        const page = Number(soTrang);
        const size = Number(soPhanTuTrenTrang);
        const start = (page - 1) * size;
        const end = page * size;
        const userPaginate = users.slice(start, end);
        const total = users.length;
        const totalPages = Math.ceil(total / size);

        return {
          userPaginate,
          page,
          size,
          total,
          totalPages,
        };
      }
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async timKiemNguoiDung(body) {
    try {
      const { tai_khoan, ho_ten, email, so_dt, loai_nguoi_dung } = body;
      const user = await prisma.nguoiDung.findMany({
        where: {
          tai_khoan,
          ho_ten,
          email,
          so_dt,
          loai_nguoi_dung,
        },
      });
      if (user.length > 0) {
        return user;
      }
      return 'không tìm thấy';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async timKiemNguoiDungPhanTrang(body, soTrang, soPhanTuTrenTrang) {
    try {
      const { tai_khoan, ho_ten, email, so_dt, loai_nguoi_dung } = body;
      const users = await prisma.nguoiDung.findMany({
        where: {
          tai_khoan,
          ho_ten,
          email,
          so_dt,
          loai_nguoi_dung,
        },
      });
      if (users.length > 0) {
        const page = Number(soTrang);
        const size = Number(soPhanTuTrenTrang);
        const start = (page - 1) * size;
        const end = page * size;
        const userPaginate = users.slice(start, end);
        const total = users.length;
        const totalPages = Math.ceil(total / size);

        return {
          userPaginate:
            userPaginate.length > 0 ? userPaginate : 'không có data',
          page,
          size,
          total,
          totalPages,
        };
      }
      return 'không tìm thấy';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async thongTinTaiKhoan(data: NguoiDung, id: string) {
    try {
      await prisma.nguoiDung.update({
        where: {
          tai_khoan: Number(id),
        },
        data,
      });
      return 'update thông tin tài khoản ok';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async layThongTinNguoiDung(id: string) {
    try {
      const user = await prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: Number(id),
        },
      });
      return user;
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async themNguoiDung(data: NguoiDung) {
    try {
      const hashPass = await bcrypt.hash(data.mat_khau, 10);
      await prisma.nguoiDung.create({
        data: { ...data, mat_khau: hashPass },
      });
      return 'thêm người dùng thành công';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async capNhatThongTinNguoiDungByIdParam(data: NguoiDung, id: number) {
    try {
      const hashPass = await bcrypt.hash(data.mat_khau, 10);
      await prisma.nguoiDung.update({
        data: { ...data, mat_khau: hashPass },
        where: {
          tai_khoan: id,
        },
      });
      return 'cập nhật người dùng thành công';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async capNhatThongTinNguoiDung(data: NguoiDung) {
    try {
      const hashPass = await bcrypt.hash(data.mat_khau, 10);
      await prisma.nguoiDung.update({
        data: { ...data, mat_khau: hashPass },
        where: {
          tai_khoan: data.tai_khoan,
        },
      });
      return 'cập nhật người dùng thành công';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async xoaNguoiDung(id: number) {
    console.log('tai_khoan', id);
    try {
      await prisma.nguoiDung.delete({
        where: {
          tai_khoan: Number(id),
        },
      });
      return 'xóa người dùng thành công';
    } catch (err) {
      throw new HttpException('err', 404);
    }
  }
}
