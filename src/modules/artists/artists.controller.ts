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
import { ArtistService } from './artists.service';
import { CreateArtistDto } from './dto/create-artists.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getAll();
  }
  @Get(':id')
  getArtistById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistService.getById(id);
  }
  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }
  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    console.log(updateArtist);
    return this.artistService.updateArtist(id, updateArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.artistService.deleteArtist(id);
  }
}
