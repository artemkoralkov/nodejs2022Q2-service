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
  async getAlbums() {
    return await this.albumService.getAll();
  }
  @Get(':id')
  async getAlbumById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.albumService.getById(id);
  }
  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }
  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() updateAlbum: UpdateAlbumDto,
  ) {
    return await this.albumService.updateAlbum(id, updateAlbum);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.albumService.deleteAlbum(id);
  }
}
