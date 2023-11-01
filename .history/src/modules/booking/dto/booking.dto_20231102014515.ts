import { ApiProperty } from '@nestjs/swagger';

export class DatVeDto {
  @ApiProperty()
  ma_ghe?: number;

  @ApiProperty()
  ma_lich_chieu?: number;

  @ApiProperty()
  tai_khoan?: number;
}
