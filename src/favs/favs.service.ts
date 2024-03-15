import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createFav, deleteFav } from 'src/utils/utils';

@Injectable()
export class FavsService {
  private favsId: string;
  constructor(private prisma: PrismaService) {
    prisma.favs.findFirst().then((favs) => {
      this.favsId = favs.id;
    });
  }
  async findAll() {
    const [favs] = await this.prisma.favs.findMany({
      select: {
        id: false,
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            albumId: true,
            artistId: true,
          },
        },
      },
    });
    return favs;
  }

  async createTrack(id: string) {
    await createFav(this.prisma, id, this.favsId, 'track');
  }

  async deleteTrack(id: string) {
    await deleteFav(this.prisma, id, 'track');
  }

  async createAlbum(id: string) {
    await createFav(this.prisma, id, this.favsId, 'album');
  }

  async deleteAlbum(id: string) {
    await deleteFav(this.prisma, id, 'album');
  }
  async createArtist(id: string) {
    await createFav(this.prisma, id, this.favsId, 'artist');
  }

  async deleteArtist(id: string) {
    await deleteFav(this.prisma, id, 'artist');
  }
}
