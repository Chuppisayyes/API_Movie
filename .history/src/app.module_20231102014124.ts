import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CinemaSystemModule } from './cinema-system/cinema-system.module';
import { CinemaComplexModule } from './cinema-complex/cinema-complex.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BookingModule } from './modules/booking/booking.module';
import { FilmModule } from './modules/film/film.module';
import { CinemaModule } from './modules/cinema/cinema.module';


@Module({
  imports: [
    UsersModule, 
    BookingModule, 
    FilmModule, 
    CinemaModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), CinemaSystemModule, CinemaComplexModule, AuthModule
    ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
})
export class AppModule {}
