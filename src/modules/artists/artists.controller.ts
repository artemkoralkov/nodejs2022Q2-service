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
  async getArtists() {
    return await this.artistService.getAll();
  }
  @Get(':id')
  async getArtistById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.artistService.getById(id);
  }
  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }
  @Put(':id')
  async updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    return await this.artistService.updateArtist(id, updateArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.artistService.deleteArtist(id);
  }
}
