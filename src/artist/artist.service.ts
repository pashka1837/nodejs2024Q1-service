import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    try {
      const newArtist = await this.prisma.artist.create({
        data: { ...createArtistDto },
      });
      return new ArtistEntity(newArtist);
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const artists = await this.prisma.artist.findMany();
      return artists.map((art) => new ArtistEntity(art));
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    // try {
    const artist = await this.prisma.artist.findUnique({
      where: { id: id },
    });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return new ArtistEntity(artist);
    // } catch {
    //   // console.log('not found');
    // }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const updArtist = await this.prisma.artist.update({
        where: { id: id },
        data: { ...updateArtistDto },
      });
      return new ArtistEntity(updArtist);
    } catch {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id: id } });
      await this.prisma.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
      await this.prisma.track.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
    } catch {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
