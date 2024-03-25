import type { Artist as ArtistPrisma } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;
  @Exclude()
  favsId: string;
  constructor(partial: Partial<ArtistPrisma>) {
    Object.assign(this, partial);
  }
}
