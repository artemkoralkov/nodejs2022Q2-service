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
  async getFavorites() {
    return await this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrackToTheFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.addTrackToTheFavorites(id);
  }

  @Post('album/:id')
  async addAlbumToTheFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.addAlbumToTheFavorites(id);
  }

  @Post('artist/:id')
  async addArtistToTheFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.addArtistToTheFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.deleteArtistFromFavorites(id);
  }
}
