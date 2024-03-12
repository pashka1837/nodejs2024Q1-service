import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(partial: Partial<FavoritesResponse>) {
    Object.assign(this, partial);
  }
}
