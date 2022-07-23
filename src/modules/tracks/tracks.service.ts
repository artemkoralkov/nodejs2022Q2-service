import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERRORS } from 'src/utils/errors';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}
  async createTrack(newTrack: CreateTrackDto) {
    const track = this.tracksRepository.create(newTrack);
    return await this.tracksRepository.save(track);
  }

  async updateTrack(id: string, updateTrack: UpdateTrackDto) {
    const updatingTrack = await this.getById(id);

    if (!updatingTrack) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    await this.tracksRepository.update(id, updateTrack);
    return await this.getById(id);
  }

  async deleteTrack(id: string) {
    const track = await this.tracksRepository.delete(id);
    if (track.affected === 0) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
  }

  async getById(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  async getAll() {
    return await this.tracksRepository.find();
  }

  async isTrackExists(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      return true;
    }
    return false;
  }
}
