import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
const prisma = new PrismaClient();

@Injectable()
export class BookingService {
  as datVe(createBookingDto: CreateBookingDto) {
    try {
      const { ma_ghe, ma_lich_chieu, tai_khoan } = CreateBookingDto;

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

      const danhSachPhongve = await prisma.RapPhim.findMany({
        include: {
          CumRap: true
        },

      });
      return danhSachPhongve;
    } catch (err) {
      throw new HttpException(err, 404)
    }
  }

  async TaoLichChieu(body: lichChieu) {
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
