import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const newAlbum = await this.prisma.album.create({
        data: { ...createAlbumDto },
      });
      return new AlbumEntity(newAlbum);
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const albums = await this.prisma.album.findMany();
      return albums.map((alb) => new AlbumEntity(alb));
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    try {
      const album = await this.prisma.album.findUniqueOrThrow({
        where: { id: id },
      });
      return new AlbumEntity(album);
    } catch {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      console.log(id, updateAlbumDto);
      const updAlbum = await this.prisma.album.update({
        where: { id: id },
        data: { ...updateAlbumDto },
      });
      console.log(updAlbum);
      return new AlbumEntity(updAlbum);
    } catch {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id: id } });
      await this.prisma.track.updateMany({
        where: { albumId: id },
        data: { albumId: null },
      });
    } catch {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
