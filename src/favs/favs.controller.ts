import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll(@Res() response: Response) {
    const { status, data } = this.favsService.findAll();
    return response.status(status).json(data);
  }

  @Post('track/:id')
  createTrack(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.createTrack(id);
    return response.status(status).json(data);
  }

  @Delete('track/:id')
  removeTrack(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.deleteTrack(id);
    return response.status(status).json(data);
  }

  @Post('album/:id')
  createAlbum(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.createAlbum(id);
    return response.status(status).json(data);
  }

  @Delete('album/:id')
  removeAlbum(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.deleteAlbum(id);
    return response.status(status).json(data);
  }

  @Post('artist/:id')
  createArtist(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.createArtist(id);
    return response.status(status).json(data);
  }

  @Delete('artist/:id')
  removeArtist(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.favsService.deleteArtist(id);
    return response.status(status).json(data);
  }
}
