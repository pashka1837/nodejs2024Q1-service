import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    // const { status, data } = this.albumService.create(createAlbumDto);
    // return response.status(status).json(data);
  }

  @Get()
  findAll() {
    // const { status, data } = this.albumService.findAll();
    // return response.status(status).json(data);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    // const { status, data } = this.albumService.findOne(id);
    // return response.status(status).json(data);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    // const { status, data } = this.albumService.update(id, updateAlbumDto);
    // return response.status(status).json(data);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    // const { status, data } = this.albumService.remove(id);
    // return response.status(status).json(data);
  }
}
