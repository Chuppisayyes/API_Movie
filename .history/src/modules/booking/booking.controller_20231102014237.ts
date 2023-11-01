import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';



@ApiTags('Quản lý đặt vé')
@Controller('/api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBody({
    description: 'Đặt vé',
    type: DatVeDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/datve')
  DatVe(@Body() body: datVe) {
    return this.quanLyDatVeService.datVe(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/layDanhSachPhongVe')
  LayDanhSachPhongVe() {
    return this.quanLyDatVeService.layDanhSachPhongVe();
  }

  @ApiBody({
    description: 'Tạo lịch chiếu',
    type: DatVeDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/taoLichChieu')
  TaoLichChieu(@Body() body: lichChieu) {
    return this.quanLyDatVeService.TaoLichChieu(body);
  }
}
