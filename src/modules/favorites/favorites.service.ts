import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/utils/errors';
import { Repository } from 'typeorm';
import { AlbumService } from '../albums/albums.service';
import { ArtistService } from '../artists/artists.service';
import { TrackService } from '../tracks/tracks.service';
import { FavoriteEntity } from './entities/favourite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async addTrackToTheFavorites(trakcId: string) {
    const favorites: FavoriteEntity = await this.getFavorites();

    if (await this.trackService.isTrackExists(trakcId)) {
      const track = await this.trackService.getById(trakcId);
      favorites.tracks.push(track);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new UnprocessableEntityException(ERRORS.TRACK_DOESENT_EXIST);
    }
  }

  async addAlbumToTheFavorites(albumId: string) {
    const favorites: FavoriteEntity = await this.getFavorites();

    if (await this.albumService.isAlbumExists(albumId)) {
      const album = await this.albumService.getById(albumId);
      favorites.albums.push(album);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new UnprocessableEntityException(ERRORS.ALBUM_DOESENT_EXIST);
    }
  }

  async addArtistToTheFavorites(artistId: string) {
    const favorites: FavoriteEntity = await this.getFavorites();

    if (await this.artistService.isArtistExists(artistId)) {
      const artist = await this.artistService.getById(artistId);
      favorites.artists.push(artist);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new UnprocessableEntityException(ERRORS.ARTIST_DOESENT_EXIST);
    }
  }

  async deleteTrackFromFavorites(id: string) {
    const favorites: FavoriteEntity = await this.getFavorites();
    const trackIndex = favorites.tracks.findIndex((track) => track.id === id);
    if (trackIndex !== -1) {
      favorites.tracks.splice(trackIndex, 1);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException(ERRORS.TRACK_NOT_IN_FAVORITES);
    }
  }

  async deleteAlbumFromFavorites(id: string) {
    const favorites: FavoriteEntity = await this.getFavorites();
    const albumIndex = favorites.albums.findIndex((album) => album.id === id);
    if (albumIndex !== -1) {
      favorites.albums.splice(albumIndex, 1);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException(ERRORS.ALBUM_NOT_IN_FAVORITES);
    }
  }

  async deleteArtistFromFavorites(id: string) {
    const favorites: FavoriteEntity = await this.getFavorites();
    const artistIndex = favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (artistIndex !== -1) {
      favorites.artists.splice(artistIndex, 1);
      await this.favoritesRepository.save(favorites);
    } else {
      throw new NotFoundException(ERRORS.ARTIST_NOT_IN_FAVORITES);
    }
  }

  async getFavorites() {
    let favorites: FavoriteEntity = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });
    if (!favorites) {
      favorites = new FavoriteEntity();
      favorites.artists = [];
      favorites.tracks = [];
      favorites.albums = [];
      await this.favoritesRepository.save(
        this.favoritesRepository.create(favorites),
      );
    }
    return favorites;
  }
}
