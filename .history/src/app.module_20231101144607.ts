import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingModule } from './booking/booking.module';
import { FlimModule } from './flim/flim.module';
import { FilmModule } from './film/film.module';
import { CinemaModule } from './cinema/cinema.module';

@Module({
  imports: [UsersModule, BookingModule, FlimModule, FilmModule, CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
