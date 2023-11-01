import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { bookingDto } from './dto/booking.dto';



@ApiTags('Quản lý đặt vé')
@Controller('/api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBody({
    description: 'Đặt vé',
    type: bookingDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/datve')
  DatVe(@Body() body: datVe) {
    return this.bookingService.datVe(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/layDanhSachPhongVe')
  LayDanhSachPhongVe() {
    return this.bookingService.layDanhSachPhongVe();
  }

  @ApiBody({
    description: 'Tạo lịch chiếu',
    type: bookingDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/taoLichChieu')
  TaoLichChieu(@Body() body: lichChieu) {
    return this.bookingService.TaoLichChieu(body);
  }
}
