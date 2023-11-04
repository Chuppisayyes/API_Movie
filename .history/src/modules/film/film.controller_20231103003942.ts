import { FilmService } from './film.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Phim } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto, FilmDto } from './dto/film.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Quản lý phim')
@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

 
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayDanhSachBanner')
  layDanhSachBanner() {
    return this.filmService.layDanhSachBanner();
  }

  @ApiBody({
    description: 'Lấy danh sách phim',
    type: FilmDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayDanhSachPhim')
  layDanhSachphim(@Body() body: Phim) {
    return this.filmService.layDanhSachphim(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayDanhSachPhimPhanTrang')
  layDanhSachphimPhanTrang(
    @Query('soTrang') soTrang: number,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number,
  ) {
    return this.filmService.layDanhSachphimPhanTrang(
      Number(soTrang),
      Number(soPhanTuTrenTrang),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/LayDanhSachPhimTheoNgay')
  layDanhSachphimTheoNgay(@Body() data: { timestart: Date; timeend: Date }) {
    return this.filmService.layDanhSachphimTheoNgay(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor(
      'file', // keyname
      {
        storage: diskStorage({
          destination: process.cwd() + '/public/img',
          filename: (req, file, callback) =>
            callback(null, Date.now() + '_' + file.originalname),
        }),
      },
    ),
  )
  @Post('/UploadHinhChoPhim/:ma_phim')
  uploadHinhChoPhim(
    @Param('ma_phim') ma_phim: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmService.uploadHinhChoPhim(ma_phim.toString(), file);
  }

  @ApiBody({
    description: 'Cập nhật phim',
    type: FilmDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/CapNhatPhim/:ma_phim')
  capNhatPhim(@Body() body: Phim, @Param('ma_phim') ma_phim: string) {
    return this.filmService.capNhatPhim(body, ma_phim.toString());
  }

  @ApiBody({
    description: 'Tìm tên phim',
    type: FilmDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/timPhimTheoTen')
  timPhimTheoTen(@Body() body: Phim) {
    return this.filmService.timPhimTheoTen(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/xoaPhimTheoTen/:ma_phim')
  xoaPhimTheoTen(@Param('ma_phim') ma_phim: number) {
    return this.filmService.xoaPhimTheoTen(Number(ma_phim));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinPhim/:ma_phim')
  layThongTinPhim(@Param('ma_phim') ma_phim: number) {
    return this.filmService.layThongTinPhim(Number(ma_phim));
  }
}
