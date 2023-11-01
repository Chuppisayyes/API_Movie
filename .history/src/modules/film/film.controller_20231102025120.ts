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
import { phim } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadDto, PhimDto } from './Dto/phim.dto';
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
  @Get('/layDanhSachBanner')
  layDanhSachBanner() {
    return this.quanLyPhimService.layDanhSachBanner();
  }

  @ApiBody({
    description: 'Lấy danh sách phim',
    type: PhimDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layDanhSachPhim')
  layDanhSachphim(@Body() body: phim) {
    return this.quanLyPhimService.layDanhSachphim(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layDanhSachPhimPhanTrang')
  layDanhSachphimPhanTrang(
    @Query('soTrang') soTrang: number,
    @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: number,
  ) {
    return this.quanLyPhimService.layDanhSachphimPhanTrang(
      Number(soTrang),
      Number(soPhanTuTrenTrang),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layDanhSachPhimTheoNgay')
  layDanhSachphimTheoNgay(@Body() data: { timestart: Date; timeend: Date }) {
    return this.quanLyPhimService.layDanhSachphimTheoNgay(data);
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
  @Post('/uploadHinhChoPhim/:ma_phim')
  uploadHinhChoPhim(
    @Param('ma_phim') ma_phim: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.quanLyPhimService.uploadHinhChoPhim(ma_phim.toString(), file);
  }

  @ApiBody({
    description: 'Cập nhật phim',
    type: PhimDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/capNhatPhim/:ma_phim')
  capNhatPhim(@Body() body: phim, @Param('ma_phim') ma_phim: string) {
    return this.quanLyPhimService.capNhatPhim(body, ma_phim.toString());
  }

  @ApiBody({
    description: 'Tìm tên phim',
    type: PhimDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/timPhimTheoTen')
  timPhimTheoTen(@Body() body: phim) {
    return this.quanLyPhimService.timPhimTheoTen(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/xoaPhimTheoTen/:ma_phim')
  xoaPhimTheoTen(@Param('ma_phim') ma_phim: number) {
    return this.quanLyPhimService.xoaPhimTheoTen(Number(ma_phim));
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/layThongTinPhim/:ma_phim')
  layThongTinPhim(@Param('ma_phim') ma_phim: number) {
    return this.quanLyPhimService.layThongTinPhim(Number(ma_phim));
  }
}
