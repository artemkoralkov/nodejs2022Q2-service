import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ArtistModule } from './modules/artists/artists.module';
import { TrackModule } from './modules/tracks/tracks.module';
import { AlbumModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
})
export class AppModule {}
