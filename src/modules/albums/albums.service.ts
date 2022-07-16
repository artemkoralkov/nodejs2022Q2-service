import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { ERRORS } from 'src/utils/errors';
import { v4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/albums.interface';

@Injectable()
export class AlbumService {
  private db = db;

  createAlbum(album: CreateAlbumDto) {
    const newAlbum: Album = {
      id: v4(),
      ...album,
    };
    this.db.addAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbum: UpdateAlbumDto) {
    const updatingAlbum = this.db.getAlbum(id);

    if (!updatingAlbum) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }

    return { ...updatingAlbum, ...updateAlbum };
  }

  deleteAlbum(id: string) {
    const album = this.db.getAlbum(id);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    this.db.deleteAlbum(id);
  }

  getById(id: string) {
    const album = this.db.getAlbum(id);
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return album;
  }

  getAll() {
    return this.db.getAlbums();
  }
}
