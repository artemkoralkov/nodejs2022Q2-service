import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { ERRORS } from 'src/utils/errors';
import { v4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private db = db;

  createTrack(track: CreateTrackDto) {
    const newTrack: Track = {
      id: v4(),
      ...track,
    };
    this.db.addTrack(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrack: UpdateTrackDto) {
    const updatingTrack = this.db.getTrack(id);

    if (!updatingTrack) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }

    return { ...updatingTrack, ...updateTrack };
  }

  deleteTrack(id: string) {
    const track = this.db.getTrack(id);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    this.db.deleteTrack(id);
  }

  getById(id: string) {
    const track = this.db.getTrack(id);
    if (!track) {
      throw new NotFoundException(ERRORS.TRACK_NOT_FOUND);
    }
    return track;
  }

  getAll() {
    return this.db.getTracks();
  }
}
