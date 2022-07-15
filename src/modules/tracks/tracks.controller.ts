import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getAll();
  }
  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.getById(id);
  }
  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }
  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrack: CreateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrack);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.trackService.deleteTrack(id);
  }
}
