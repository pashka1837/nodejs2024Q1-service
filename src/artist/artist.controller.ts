import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Res() response: Response, @Body() createArtistDto: CreateArtistDto) {
    const { status, data } = this.artistService.create(createArtistDto);
    return response.status(status).json(data);
  }

  @Get()
  findAll(@Res() response: Response) {
    const { status, data } = this.artistService.findAll();
    return response.status(status).json(data);
  }

  @Get(':id')
  findOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.artistService.findOne(id);
    return response.status(status).json(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { status, data } = this.artistService.update(id, updateArtistDto);
    return response.status(status).json(data);
  }

  @Delete(':id')
  remove(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.artistService.remove(id);
    return response.status(status).json(data);
  }
}
