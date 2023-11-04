
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaClient, NguoiDung } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


const prisma = new PrismaClient();
@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
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
        if (checkPass) {
          const token = this.jwtService.sign({
            tai_khoan: checkUser.tai_khoan, 
            email: checkUser.email, // Thêm thông tin tài khoản cần thiết
          }, {
            secret: this.config.get("SECRET_KEY"),
            expiresIn: "8h"
          });
          return token;
        } else {
          throw new HttpException('Sai mật khẩu', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Email không tồn tại', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException('Lỗi không xác định', HttpStatus.INTERNAL_SERVER_ERROR);
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
        return 'Hãy nhập số trang';
      }
      if (!soPhanTuTrenTrang) {
        return 'Hãy nhập số phần tử trên trang';
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
  
      const users = await prisma.nguoiDung.findMany({
        where: {
          OR: [
            { tai_khoan: tai_khoan }, // Tìm theo tài khoản
            { ho_ten: ho_ten }, // Tìm theo họ tên
            { email: email }, // Tìm theo email
            { so_dt: so_dt }, // Tìm theo số điện thoại
          ],
          loai_nguoi_dung: loai_nguoi_dung, // Điều kiện tìm kiếm theo loại người dùng (nếu cần)
        },
      });
  
      if (users.length > 0) {
        return users;
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
          OR: [
            { tai_khoan: tai_khoan }, // Tìm theo tài khoản
            { ho_ten: ho_ten }, // Tìm theo họ tên
            { email: email }, // Tìm theo email
            { so_dt: so_dt }, // Tìm theo số điện thoại
          ],
          loai_nguoi_dung: loai_nguoi_dung, // Điều kiện tìm kiếm theo loại người dùng (nếu cần)
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
            userPaginate.length > 0 ? userPaginate : 'Không có data',
          page,
          size,
          total,
          totalPages,
        };
      }
      return 'Không tìm thấy';
    } catch (err) {
      throw new HttpException(err, 404);
    }
  }

  async thongTinTaiKhoanByToken(tai_khoan: number) {
    try {
      const userInfo = await prisma.nguoiDung.findUnique({
        where: {
          tai_khoan,
        },
      });
      if (userInfo) {
        return userInfo;
      } else {
        throw new HttpException('Người dùng không tồn tại', 404);
      }
    } catch (err) {
      throw new HttpException(err, 500); // Hoặc mã lỗi phù hợp
    }
  }


  async layThongTinNguoiDung(id: string) {
    try {
      const user = await prisma.nguoiDung.findUnique({
        where: {
          tai_khoan: Number(id),
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('Lỗi không xác định', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async themNguoiDung(body: NguoiDung) {
    try {
      // Kiểm tra xem người dùng đã tồn tại với email đã cho
      const existingUser = await prisma.nguoiDung.findFirst({
        where: {
          email: body.email,
        },
      });
  
      if (existingUser) {
        throw new HttpException('Người dùng với email này đã tồn tại', HttpStatus.CONFLICT);
      }
  
      // Kiểm tra xem có các trường dữ liệu bị thiếu hoặc mật khẩu yếu
      if (!body.email || !body.mat_khau || !body.ho_ten || !body.so_dt || !body.loai_nguoi_dung) {
        throw new HttpException('Thiếu thông tin người dùng hoặc mật khẩu', HttpStatus.BAD_REQUEST);
      }
  
      // Kiểm tra tính mạnh của mật khẩu
      const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
      if (!passwordStrengthRegex.test(body.mat_khau)) {
        throw new HttpException('Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.', HttpStatus.BAD_REQUEST);
      }
  
      // // Tiến hành tạo người dùng nếu không có lỗi
      // const hashPass = await bcrypt.hash(body.mat_khau, 10);
      // const newUser = await prisma.nguoiDung.create({
      //   data: {
      //     email: body.email,
      //     mat_khau: hashPass,
      //     ho_ten: body.ho_ten,
      //     so_dt: body.so_dt,
      //     loai_nguoi_dung: body.loai_nguoi_dung,
      //     // Các trường dữ liệu khác tại đây
      //   },
      // });
  
      return 'Thêm người dùng thành công';
    } catch (error) {
      throw new HttpException('Lỗi trong quá trình xử lý yêu cầu', HttpStatus.INTERNAL_SERVER_ERROR);
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
      return 'Cập nhật người dùng thành công';
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
      return 'Cập nhật người dùng thành công';
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
      return 'Xóa người dùng thành công';
    } catch (err) {
      throw new HttpException('err', 404);
    }
  }
}
