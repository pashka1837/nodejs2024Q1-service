import type { Album as AlbumPrisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AlbumEntity {
  id: string;
  artistId: string | null;
  name: string;
  year: number;
  @Exclude()
  favsId: string;
  constructor(partial: Partial<AlbumPrisma>) {
    Object.assign(this, partial);
  }
}
