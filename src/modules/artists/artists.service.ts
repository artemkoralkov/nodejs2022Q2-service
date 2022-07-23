import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/utils/errors';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artists.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  async createArtist(newArtist: CreateArtistDto) {
    const artist = this.artistsRepository.create(newArtist);
    return await this.artistsRepository.save(artist);
  }

  async updateArtist(id: string, updateArtist: UpdateArtistDto) {
    const updatingArtist = await this.artistsRepository.findOne({
      where: { id },
    });

    if (!updatingArtist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    const updatedArtist = { ...updatingArtist, ...updateArtist };
    await this.artistsRepository.update(id, updatedArtist);
    return await this.getById(id);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistsRepository.delete(id);
    if (artist.affected === 0) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
  }

  async getById(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ERRORS.ARTIST_NOT_FOUND);
    }
    return artist;
  }

  async getAll() {
    return await this.artistsRepository.find();
  }

  async isArtistExists(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (artist) {
      return true;
    }
    return false;
  }
}
