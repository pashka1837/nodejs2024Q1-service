import { Track, CreateTrackDto, UpdateTrackDto } from './track.interface';
import { randomUUID } from 'crypto';

class TracksDB {
  private tracksMap = new Map<string, Track>();

  getTracks() {
    return [...this.tracksMap.values()];
  }

  getTrackById(id: string) {
    const returnTrack = this.tracksMap.get(id);
    if (!returnTrack) return null;
    return returnTrack;
  }

  postTrack(postTrack: CreateTrackDto) {
    const newTrack: Track = {
      id: randomUUID(),
      name: postTrack.name,
      duration: postTrack.duration,
      artistId: postTrack.artistId || null,
      albumId: postTrack.albumId || null,
    };
    this.tracksMap.set(newTrack.id, newTrack);
    return { ...newTrack };
  }

  putTrack(putData: UpdateTrackDto, id: string) {
    const foundTrack = this.getTrackById(id);
    if (!foundTrack) return null;
    foundTrack.name = putData.name;
    foundTrack.duration = putData.duration;
    foundTrack.artistId = putData.artistId || null;
    foundTrack.albumId = putData.albumId || null;

    this.tracksMap.set(foundTrack.id, foundTrack);
    return foundTrack;
  }

  deleteTrack(id: string) {
    const foundTrack = this.getTrackById(id);
    if (!foundTrack) return false;
    this.tracksMap.delete(id);
    return true;
  }
}

export const tracksDB = new TracksDB();
