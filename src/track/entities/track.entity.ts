import type { Track as TrackPrisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
  @Exclude()
  favsId: string;
  constructor(partial: Partial<TrackPrisma>) {
    Object.assign(this, partial);
  }
}
