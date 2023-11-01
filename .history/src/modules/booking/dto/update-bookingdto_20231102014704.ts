import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyDatVeDto } from './create-quan-ly-dat-ve.dto';

export class UpdateQuanLyDatVeDto extends PartialType(CreateQuanLyDatVeDto) {}
