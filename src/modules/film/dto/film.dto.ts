import { ApiProperty } from "@nestjs/swagger";


export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FilmDto {
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