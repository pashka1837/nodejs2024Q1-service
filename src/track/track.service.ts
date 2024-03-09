import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracksDB } from 'db/track/tracksDB';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack = tracksDB.postTrack(createTrackDto);
    return { status: 201, data: newTrack };
  }

  findAll() {
    const tracks = tracksDB.getTracks();
    return { status: 200, data: tracks };
  }

  findOne(id: string) {
    const track = tracksDB.getTrackById(id);
    if (!track) return { status: 404, data: { msg: 'Track not found' } };
    return { status: 200, data: track };
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const updTrack = tracksDB.putTrack(updateTrackDto, id);
    if (!updTrack) return { status: 404, data: { msg: 'Track not found' } };
    return { status: 200, data: updTrack };
  }

  remove(id: string) {
    const isTrackDel = tracksDB.deleteTrack(id);
    if (!isTrackDel) return { status: 404, data: { msg: 'Track not found' } };
    // tracksDB.getTracks().forEach((album) => {
    //   if (album.artistId === id) album.artistId = null;
    // });
    return { status: 204, data: { msg: 'Track has been deleted' } };
  }
}
