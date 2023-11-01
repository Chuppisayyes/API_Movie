import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingModule } from './booking/booking.module';
import { FilmModule } from './film/film.module';
import { CinemaModule } from './cinema/cinema.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    UsersModule, 
    BookingModule, 
    FilmModule, 
    CinemaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    })
    ],
  controllers: [AppController],
  providers: [AppService,
    JwtStrategy
  ],
})
export class AppModule {}
