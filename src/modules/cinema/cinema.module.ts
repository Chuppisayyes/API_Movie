import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';

@Module({
  controllers: [CinemaController],
  providers: [CinemaService]
})
export class CinemaModule {}
