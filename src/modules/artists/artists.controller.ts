import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artists.service';
import { CreateArtistDto } from './dto/create-artists.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getAll();
  }
  @Get(':id')
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.getById(id);
  }
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }
  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtist: CreateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtist);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.artistService.deleteArtist(id);
  }
}
