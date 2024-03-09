import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Res() response: Response, @Body() createAlbumDto: CreateAlbumDto) {
    const { status, data } = this.albumService.create(createAlbumDto);
    return response.status(status).json(data);
  }

  @Get()
  findAll(@Res() response: Response) {
    const { status, data } = this.albumService.findAll();
    return response.status(status).json(data);
  }

  @Get(':id')
  findOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.albumService.findOne(id);
    return response.status(status).json(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { status, data } = this.albumService.update(id, updateAlbumDto);
    return response.status(status).json(data);
  }

  @Delete(':id')
  remove(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.albumService.remove(id);
    return response.status(status).json(data);
  }
}
