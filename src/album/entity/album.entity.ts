import type { Album as AlbumPrisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  @Exclude()
  favsId: string;
  constructor(partial: Partial<AlbumPrisma>) {
    Object.assign(this, partial);
  }
}
