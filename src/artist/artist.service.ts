import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artistsDB } from 'db/artist/artistDB';
import { albumsDB } from 'db/album/artistDB';
import { tracksDB } from 'db/track/tracksDB';
import { favsDB } from 'db/favs/favsDB';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist = artistsDB.postArtist(createArtistDto);
    return { status: 201, data: newArtist };
  }

  findAll() {
    const artists = artistsDB.getArtists();
    return { status: 200, data: artists };
  }

  findOne(id: string) {
    const artist = artistsDB.getArtistById(id);
    if (!artist) return { status: 404, data: { msg: 'Artist not found' } };
    return { status: 200, data: artist };
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const updArtist = artistsDB.putArtist(updateArtistDto, id);
    if (!updArtist) return { status: 404, data: { msg: 'Artist not found' } };
    return { status: 200, data: updArtist };
  }

  remove(id: string) {
    const isArtistDel = artistsDB.deleteUser(id);
    if (!isArtistDel) return { status: 404, data: { msg: 'Artist not found' } };
    albumsDB.getAlbums().forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
    tracksDB.getTracks().forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    favsDB.deleteArtist(id);
    return { status: 204, data: { msg: 'Artist has been deleted' } };
  }
}
