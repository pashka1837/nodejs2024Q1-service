import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  Res,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Res() response: Response, @Body() createTrackDto: CreateTrackDto) {
    const { status, data } = this.trackService.create(createTrackDto);
    return response.status(status).json(data);
  }

  @Get()
  findAll(@Res() response: Response) {
    const { status, data } = this.trackService.findAll();
    return response.status(status).json(data);
  }

  @Get(':id')
  findOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.trackService.findOne(id);
    return response.status(status).json(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { status, data } = this.trackService.update(id, updateTrackDto);
    return response.status(status).json(data);
  }

  @Delete(':id')
  remove(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.trackService.remove(id);
    return response.status(status).json(data);
  }
}
