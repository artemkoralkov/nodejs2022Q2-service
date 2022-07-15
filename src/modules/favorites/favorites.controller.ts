import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  addTrackToTheFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addTrackToTheFavorites(id);
  }

  @Post('album/:id')
  addAlbumToTheFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addAlbumToTheFavorites(id);
  }

  @Post('artist/:id')
  addArtistToTheFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.addArtistToTheFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtistFromFavorites(id);
  }
}
