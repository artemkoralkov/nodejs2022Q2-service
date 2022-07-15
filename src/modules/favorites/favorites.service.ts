import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from 'src/db';
import { ERRORS } from 'src/utils/errors';

@Injectable()
export class FavoritesService {
  private db = db;

  addTrackToTheFavorites(id: string) {
    if (this.db.getTrack(id)) {
      this.db.addTrackToTheFavorites(id);
    } else {
      throw new UnprocessableEntityException(ERRORS.TRACK_DOESENT_EXIST);
    }
  }

  addAlbumToTheFavorites(id: string) {
    if (this.db.getAlbum(id)) {
      this.db.addAlbumToTheFavorites(id);
    } else {
      throw new UnprocessableEntityException(ERRORS.ALBUM_DOESENT_EXIST);
    }
  }

  addArtistToTheFavorites(id: string) {
    if (this.db.getArtist(id)) {
      this.db.addArtistToTheFavorites(id);
    } else {
      throw new UnprocessableEntityException(ERRORS.ARTIST_DOESENT_EXIST);
    }
  }

  deleteTrackFromFavorites(id: string) {
    if (this.db.isTrackInFavorites(id)) {
      this.db.deleteTrackFromFavorites(id);
    } else {
      throw new NotFoundException(ERRORS.TRACK_NOT_IN_FAVORITES);
    }
  }

  deleteAlbumFromFavorites(id: string) {
    if (this.db.isAlbumInFavorites(id)) {
      this.db.deleteAlbumFromFavorites(id);
    } else {
      throw new NotFoundException(ERRORS.ALBUM_NOT_IN_FAVORITES);
    }
  }

  deleteArtistFromFavorites(id: string) {
    if (this.db.isArtistInFavorites(id)) {
      this.db.deleteArtistFromFavorites(id);
    } else {
      throw new NotFoundException(ERRORS.ARTIST_NOT_IN_FAVORITES);
    }
  }

  getFavorites() {
    return this.db.getFavorites();
  }
}
