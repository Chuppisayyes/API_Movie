import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


@Injectable()
export class CinemaService {
  async layThongTinHeThongRap() {
    try {
      const rap = await prisma.heThongRapeThongRap.findMany();
      return rap;
    } catch (err) {
      throw new HttpException('lỗi BE', 500);
    }
  }

  async layThongTinCumRapTheoHeThong(ma_cum_rap: number) {
    try {
      const cumRap = await prisma.cumRap.findMany({
        include: {
          HeThongRap: true,
        },
        where: {
          ma_cum_rap: ma_cum_rap ? Number(ma_cum_rap) : 1,
        },
      });
      return cumRap;
    } catch (err) {
      throw new HttpException('lỗi BE', 500);
    }
  }

  async layThongTinLichChieuHeThongRap(ma_rap: number) {
    try {
      const lichChieu = await prisma.lichChieu.findMany({
        where: {
          ma_rap: Number(ma_rap),
        },
        include: {
          RapPhim: true,
          Phim: true,
        },
      });
      if (lichChieu.length === 0) {
        return 'không tìm thấy';
      }
      return lichChieu;
    } catch (err) {
      throw new HttpException(`${err}`, 500);
    }
  }

  async layThongTinLichChieuPhim(ma_phim: number) {
    try {
      const lichChieu = await prisma.lichChieu.findMany({
        where: {
          ma_phim,
        },
        include: {
          RapPhim: true,
          Phim: true,
        },
      });
      if (lichChieu.length === 0) {
        return 'không tìm thấy';
      }
      return lichChieu;
    } catch (err) {
      throw new HttpException(`${err}`, 500);
    }
  }
}
