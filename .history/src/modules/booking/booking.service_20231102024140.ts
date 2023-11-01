import { HttpException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaClient, LichChieu } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class BookingService {
  async datVe(createBookingDto: CreateBookingDto) {
    try {
      const { ma_ghe, ma_lich_chieu, tai_khoan } = createBookingDto;

      await prisma.datVe.create({
        data: {
          ma_ghe,
          ma_lich_chieu,
          tai_khoan,
        },
      });
      return 'tạo lịch đặt vé ok';
    } catch (err) {
      throw new HttpException(err, 404)
    }
  }

  async layDanhSachPhongVe() {
    try {

      const danhSachPhongve = await prisma.rapPhim.findMany({
        include: {
          CumRap: true
        },

      });
      return danhSachPhongve;
    } catch (err) {
      throw new HttpException(err, 404)
    }
  }

  async TaoLichChieu(body: LichChieu) {
    try {

      await prisma.lichChieu.create({
        data: body,

      });
      return 'tạo lịch chiếu ok';
    } catch (err) {

      throw new HttpException(err, 404)
    }
  }
}
