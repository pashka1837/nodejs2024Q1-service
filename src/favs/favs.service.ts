import { Injectable } from '@nestjs/common';
import { favsDB } from 'db/favs/favsDB';
import { albumsDB } from 'db/album/artistDB';
import { FavoritesResponse } from './entities/fav.entity';
import { tracksDB } from 'db/track/tracksDB';
import { artistsDB } from 'db/artist/artistDB';

@Injectable()
export class FavsService {
  findAll() {
    const favs = favsDB.getAll();

    const returnFavs = new FavoritesResponse({
      albums: favs.albums.map((id) => albumsDB.getAlbumById(id)),
      tracks: favs.tracks.map((id) => tracksDB.getTrackById(id)),
      artists: favs.artists.map((id) => artistsDB.getArtistById(id)),
    });

    return { status: 200, data: returnFavs };
  }

  createTrack(id: string) {
    const isExist = tracksDB.getTrackById(id);
    if (!isExist) return { status: 422, data: { msg: 'Track not found' } };
    favsDB.postTrack(id);
    return { status: 201, data: { msg: 'Track added to favourites' } };
  }

  deleteTrack(id: string) {
    return favsDB.deleteTrack(id)
      ? { status: 204, data: { msg: 'Track was deleted frpm favourites' } }
      : { status: 404, data: { msg: 'Track not found' } };
  }

  createAlbum(id: string) {
    const isExist = albumsDB.getAlbumById(id);
    if (!isExist) return { status: 422, data: { msg: 'Album not found' } };
    favsDB.postAlbum(id);
    return { status: 201, data: { msg: 'Album added to favourites' } };
  }

  deleteAlbum(id: string) {
    return favsDB.deleteAlbum(id)
      ? { status: 204, data: { msg: 'Album was deleted frpm favourites' } }
      : { status: 404, data: { msg: 'Album not found' } };
  }
  createArtist(id: string) {
    const isExist = artistsDB.getArtistById(id);
    if (!isExist) return { status: 422, data: { msg: 'Artist not found' } };
    favsDB.postArtist(id);
    return { status: 201, data: { msg: 'Artist added to favourites' } };
  }

  deleteArtist(id: string) {
    return favsDB.deleteArtist(id)
      ? { status: 204, data: { msg: 'Artist was deleted frpm favourites' } }
      : { status: 404, data: { msg: 'Artist not found' } };
  }
}
