import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ArtistModule } from './modules/artists/artists.module';
import { TrackModule } from './modules/tracks/tracks.module';
import { AlbumModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';
import DataSourceOptions from './ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    TypeOrmModule.forRoot(DataSourceOptions),
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
