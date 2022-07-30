import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/utils/errors';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}
  async createAlbum(newAlbum: CreateAlbumDto) {
    try {
      const album = this.albumsRepository.create(newAlbum);
      return await this.albumsRepository.save(album);
    } catch {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
  }

  async updateAlbum(id: string, updateAlbum: UpdateAlbumDto) {
    const updatingAlbum = await this.getById(id);

    if (!updatingAlbum) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }

    const updatedAlbum = { ...updatingAlbum, ...updateAlbum };
    await this.albumsRepository.update(id, updatedAlbum);
    return await this.getById(id);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.delete(id);
    if (album.affected === 0) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
  }

  async getById(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(ERRORS.ALBUM_NOT_FOUND);
    }
    return album;
  }

  async getAll() {
    return await this.albumsRepository.find();
  }

  async isAlbumExists(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (album) {
      return true;
    }
    return false;
  }
}
