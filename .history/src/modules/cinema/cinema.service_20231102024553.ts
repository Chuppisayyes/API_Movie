import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Injectable()
export class CinemaService {
  async layThongTinHeThongRap() {
    try {
      const rap = await prisma.heThongRap.findMany();
      return rap;
    } catch (err) {
      throw new HttpException('lỗi BE', 500);
    }
  }

  async layThongTinCumRapTheoHeThong(ma_cum_rap: number) {
    try {
      const cumRap = await prisma.cumRap.findMany({
        include: {
          heThongRap: true,
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
          rapPhim: true,
          phim: true,
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
          rapPhim: true,
          phim: true,
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
