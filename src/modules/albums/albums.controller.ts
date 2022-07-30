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
import { AlbumService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAll();
  }
  @Get(':id')
  getAlbumById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.getById(id);
  }
  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }
  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateAlbum: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.albumService.deleteAlbum(id);
  }
}
