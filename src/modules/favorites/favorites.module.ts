import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favourite.entity';
import { ArtistModule } from '../artists/artists.module';
import { AlbumModule } from '../albums/albums.module';
import { TrackModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),

    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
