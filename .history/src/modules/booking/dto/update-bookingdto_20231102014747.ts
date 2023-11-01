import { PartialType } from '@nestjs/swagger';
import { CreateQuanLyDatVeDto } from './create-quan-ly-dat-ve.dto';
import { CreateBookingDto } from './create-booking.dto';

export class UpdatebookingDto extends PartialType(CreateBookingDto) {}
