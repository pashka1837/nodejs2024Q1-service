import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.prisma.track.create({
      data: { ...createTrackDto },
    });
    return new TrackEntity(newTrack);
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks.map((trc) => new TrackEntity(trc));
  }

  async findOne(id: string) {
    try {
      const track = await this.prisma.track.findUniqueOrThrow({
        where: { id: id },
      });
      return new TrackEntity(track);
    } catch {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const updTrack = await this.prisma.track.update({
        where: { id: id },
        data: { ...updateTrackDto },
      });
      return new TrackEntity(updTrack);
    } catch {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({ where: { id: id } });
    } catch {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
