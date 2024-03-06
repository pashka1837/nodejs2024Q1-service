import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artistsDB } from 'db/artist/artistDB';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    if (
      typeof createArtistDto.grammy !== 'boolean' ||
      !createArtistDto.name ||
      typeof createArtistDto.name !== 'string'
    )
      return { status: 400, data: { msg: 'Doesn`t contain required fields' } };
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
    if (
      typeof updateArtistDto.grammy !== 'boolean' ||
      !updateArtistDto.name ||
      typeof updateArtistDto.name !== 'string'
    )
      return { status: 400, data: { msg: 'Doesn`t contain required fields' } };
    const updArtist = artistsDB.putArtist(updateArtistDto, id);
    if (!updArtist) return { status: 404, data: { msg: 'Artist not found' } };
    return { status: 200, data: updArtist };
  }

  remove(id: string) {
    return artistsDB.deleteUser(id)
      ? { status: 204, data: { msg: 'Artist has been deleted' } }
      : { status: 404, data: { msg: 'Artist not found' } };
  }
}
