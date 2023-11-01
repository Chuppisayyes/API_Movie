import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  import { ApiProperty } from "@nestjs/swagger";


  export class FileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
  }
  
  export class PhimDto {
    @ApiProperty()
    ten_phim: string
  
    @ApiProperty()
    trailer: string | null
  
    @ApiProperty()
    hinh_anh: string | null
  
    @ApiProperty()
    mo_ta: string
  
    @ApiProperty()
    ngay_khoi_chieu: Date
  
    @ApiProperty()
    danh_gia: number
  
    @ApiProperty()
    hot: boolean
  
    @ApiProperty()
    dang_chieu: boolean
  
    @ApiProperty()
    sap_chieu: boolean
  
  }