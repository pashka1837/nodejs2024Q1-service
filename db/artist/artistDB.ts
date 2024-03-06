import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.interface';
import { randomUUID } from 'crypto';

class ArtistsDB {
  private artistsMap = new Map<string, Artist>();
  // private foundUser: User | null;

  getArtists() {
    return [...this.artistsMap.values()];
  }

  getArtistById(id: string) {
    const returnArtist = this.artistsMap.get(id);
    if (!returnArtist) return null;
    return returnArtist;
  }

  postArtist(postArtist: CreateArtistDto) {
    const newArtist: Artist = {
      id: randomUUID(),
      name: postArtist.name,
      grammy: postArtist.grammy,
    };
    this.artistsMap.set(newArtist.id, newArtist);
    return { ...newArtist };
  }

  putArtist(putData: UpdateArtistDto, id: string) {
    const foundArtist = this.getArtistById(id);
    if (!foundArtist) return null;
    foundArtist.grammy = putData.grammy;
    foundArtist.name = putData.name;
    this.artistsMap.set(foundArtist.id, foundArtist);
    return foundArtist;
  }

  deleteUser(id: string) {
    const foundArtist = this.getArtistById(id);
    if (!foundArtist) return false;
    this.artistsMap.delete(id);
    return true;
  }
}

export const artistsDB = new ArtistsDB();
