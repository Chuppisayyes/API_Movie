import { ApiProperty } from "@nestjs/swagger";

export class DangNhapDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    mat_khau: string;
}

export class TimKiemNguoiDungDto {
  @ApiProperty()
  ho_ten: string

  @ApiProperty()
  email: string

  @ApiProperty()
  so_dt: string

  @ApiProperty()
  loai_nguoi_dung: string
}
