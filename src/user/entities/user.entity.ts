import { Exclude } from 'class-transformer';
import type { User as UserPrisma } from '@prisma/client';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserPrisma>) {
    Object.assign(this, partial);
    this.createdAt = partial.createdAt.getTime();
    this.updatedAt = partial.updatedAt.getTime();
  }
}
