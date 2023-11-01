import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { bookingDto } from './dto/booking.dto';
import { DatVe } from '@prisma/client';



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
  @Post('/DatVe')
  DatVe(@Body() body: DatVe) {
    return this.bookingService.datVe(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get('/LayDanhSachPhongVe')
  LayDanhSachPhongVe() {
    return this.bookingService.layDanhSachPhongVe();
  }

  @ApiBody({
    description: 'Tạo lịch chiếu',
    type: bookingDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post('/TaoLichChieu')
  TaoLichChieu(@Body() body: LichChieu) {
    return this.bookingService.TaoLichChieu(body);
  }
}
