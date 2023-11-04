import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from './modules/users/users.module';
import { BookingModule } from './modules/booking/booking.module';
import { FilmModule } from './modules/film/film.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { UsersService } from './modules/users/users.service';


@Module({
  imports: [
    UsersModule, 
    BookingModule, 
    FilmModule, 
    CinemaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    U
  ],
})
export class AppModule {}
