import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quản lý rạp')
@Controller('/api/quanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinHeThongRap')
  layThongTinHeThongRap() {
    return this.quanLyRapService.layThongTinHeThongRap();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinCumRapTheoHeThong/:ma_cum_rap')
  layThongTinCumRapTheoHeThong(@Param('ma_cum_rap') ma_cum_rap: number) {
    return this.quanLyRapService.layThongTinCumRapTheoHeThong(ma_cum_rap);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinLichChieuHeThongRap/:ma_rap')
  layThongTinLichChieuHeThongRap(@Param('ma_rap') ma_rap: number) {
    return this.quanLyRapService.layThongTinLichChieuHeThongRap(ma_rap);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinLichChieuPhim/:ma_phim')
  layThongTinLichChieuPhim(@Param('ma_phim') ma_phim: number) {
    return this.quanLyRapService.layThongTinLichChieuPhim(Number(ma_phim));
  }
}