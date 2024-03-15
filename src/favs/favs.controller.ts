import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.deleteArtist(id);
  }
}
