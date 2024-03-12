import { Album, CreateAlbumtDto, UpdateAlbumtDto } from './album.interface';
import { randomUUID } from 'crypto';

class AlbumsDB {
  private albumsMap = new Map<string, Album>();

  getAlbums() {
    return [...this.albumsMap.values()];
  }

  getAlbumById(id: string) {
    const returnArtist = this.albumsMap.get(id);
    if (!returnArtist) return null;
    return returnArtist;
  }

  postAlbum(postAlbum: CreateAlbumtDto) {
    const newAlbum: Album = {
      id: randomUUID(),
      name: postAlbum.name,
      year: postAlbum.year,
      artistId: postAlbum.artistId || null,
    };
    this.albumsMap.set(newAlbum.id, newAlbum);
    return { ...newAlbum };
  }

  putAlbum(putData: UpdateAlbumtDto, id: string) {
    const foundAlbum = this.getAlbumById(id);
    if (!foundAlbum) return null;
    foundAlbum.year = putData.year;
    foundAlbum.name = putData.name;
    foundAlbum.artistId = putData.artistId || null;
    this.albumsMap.set(foundAlbum.id, foundAlbum);
    return foundAlbum;
  }

  deleteAlbum(id: string) {
    const foundAlbum = this.getAlbumById(id);
    if (!foundAlbum) return false;
    this.albumsMap.delete(id);
    return true;
  }
}

export const albumsDB = new AlbumsDB();
