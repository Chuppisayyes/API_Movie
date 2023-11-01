import { CreateFilmDto } from './dto/create-film.dto';
import { PrismaClient } from '@prisma/client';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FilmService {
    async layDanhSachBanner() {
      const bannerList = await prisma.banner.findMany({
        include: {
          phim: true,
        },
      });
      return bannerList;
    }
    async layDanhSachphim(body) {
      const { ten_phim } = body;
      const danhSachPhim = await prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: ten_phim,
          },
        },
      });
      return danhSachPhim;
    }
    async layDanhSachphimPhanTrang(soTrang, soPhanTuTrenTrang) {
      if (!soTrang) {
        return 'hãy nhập só trang';
      }
      if (!soPhanTuTrenTrang) {
        return 'hãy nhập só phần tử trên trang';
      }
      if (soTrang && soPhanTuTrenTrang) {
        const danhSachPhim = await prisma.phim.findMany();
        const page = Number(soTrang);
        const size = Number(soPhanTuTrenTrang);
        const start = (page - 1) * size;
        const end = page * size;
        const phimPaginate = danhSachPhim.slice(start, end);
        const total = danhSachPhim.length;
        const totalPages = Math.ceil(total / size);
        return {
          phimPaginate,
          page,
          size,
          total,
          totalPages,
        };
      }
    }
    async layDanhSachphimTheoNgay({ timestart, timeend }) {
      const end = timeend ? new Date(timeend) : new Date();
      const movies = await prisma.phim.findMany({
        where: {
          ngay_khoi_chieu: {
            gte: new Date(timestart).toISOString(),
            lte: end.toISOString(),
          },
        },
      });
      return movies;
    }
    async uploadHinhChoPhim(ma_phim, file) {
      try {
        const phim = await prisma.phim.findFirst({
          where: {
            ma_phim: Number(ma_phim),
          },
        });
        await prisma.phim.update({
          data: Object.assign(Object.assign({}, phim), {
            hinh_anh: file.filename,
          }),
          where: {
            ma_phim: Number(ma_phim),
          },
        });
        return 'Upload hình thành công';
      } catch (err) {
        throw new HttpException('lỗi BE', 500);
      }
    }
    async capNhatPhim(body, ma_phim) {
      try {
        const phim = await prisma.phim.findFirst({
          where: {
            ma_phim: Number(ma_phim),
          },
        });
        await prisma.phim.update({
          where: {
            ma_phim: Number(ma_phim),
          },
          data: body,
        });
        return 'update thành công';
      } catch (err) {
        throw new HttpException('lỗi BE', 500);
      }
    }
    async timPhimTheoTen(body) {
      try {
        const { ten_phim } = body;
        const phim = await prisma.phim.findMany({
          where: {
            ten_phim,
          },
        });
        return phim;
      } catch (err) {
        throw new HttpException('lỗi BE', 500);
      }
    }
    async xoaPhimTheoTen(ma_phim) {
      try {
        await prisma.phim.delete({
          where: {
            ma_phim: Number(ma_phim),
          },
        });
        return 'xóa phim thành công';
      } catch (err) {
        throw new HttpException(`${err}`, 500);
      }
    }
    async layThongTinPhim(ma_phim) {
      try {
        const phim = await prisma.phim.findFirst({
          where: {
            ma_phim: Number(ma_phim),
          },
        });
        return phim;
      } catch (err) {
        throw new HttpException(`${err}`, 500);
      }
    }
  }
  