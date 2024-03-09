import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumsDB } from 'db/album/artistDB';
import { tracksDB } from 'db/track/tracksDB';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = albumsDB.postAlbum(createAlbumDto);
    return { status: 201, data: newAlbum };
  }

  findAll() {
    const albums = albumsDB.getAlbums();
    return { status: 200, data: albums };
  }

  findOne(id: string) {
    const album = albumsDB.getAlbumById(id);
    if (!album) return { status: 404, data: { msg: 'Album not found' } };
    return { status: 200, data: album };
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updAlbum = albumsDB.putAlbum(updateAlbumDto, id);
    if (!updAlbum) return { status: 404, data: { msg: 'Album not found' } };
    return { status: 200, data: updAlbum };
  }

  remove(id: string) {
    const isAlbumDel = albumsDB.deleteAlbum(id);
    if (!isAlbumDel) return { status: 404, data: { msg: 'Album not found' } };
    tracksDB.getTracks().forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
    return { status: 204, data: { msg: 'Album has been deleted' } };
  }
}
