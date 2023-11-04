import { CinemaService } from './cinema.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quản lý rạp')
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayThongTinHeThongRap')
  layThongTinHeThongRap() {
    return this.cinemaService.layThongTinHeThongRap();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayThongTinCumRapTheoHeThong/:ma_cum_rap')
  layThongTinCumRapTheoHeThong(@Param('ma_cum_rap') ma_cum_rap: number) {
    return this.cinemaService.layThongTinCumRapTheoHeThong(ma_cum_rap);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('LlayThongTinLichChieuHeThongRap/:ma_rap')
  layThongTinLichChieuHeThongRap(@Param('ma_rap') ma_rap: number) {
    return this.cinemaService.layThongTinLichChieuHeThongRap(ma_rap);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinLichChieuPhim/:ma_phim')
  layThongTinLichChieuPhim(@Param('ma_phim') ma_phim: number) {
    return this.cinemaService.layThongTinLichChieuPhim(Number(ma_phim));
  }
}
