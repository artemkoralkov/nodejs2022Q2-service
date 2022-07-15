import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { ERRORS } from 'src/utils/errors';
import { v4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artists.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private db = db;

  createArtist(artist: CreateArtistDto) {
    const newArtist: Artist = {
      id: v4(),
      ...artist,
    };
    this.db.addArtist(newArtist);
    return newArtist;
  }

  updateArtist(id: string, updateArtist: UpdateArtistDto) {
    const updatingArtist = this.db.getArtist(id);

    if (!updatingArtist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }

    updatingArtist.name = updateArtist.name || updatingArtist.name;

    if (typeof updateArtist.grammy !== 'undefined') {
      updatingArtist.grammy = updateArtist.grammy;
    }

    return updatingArtist;
  }

  deleteArtist(id: string) {
    const artist = this.db.getArtist(id);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    this.db.deleteArtist(id);
  }

  getById(id: string) {
    const artist = this.db.getArtist(id);
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    return artist;
  }

  getAll() {
    return this.db.getArtists();
  }
}
