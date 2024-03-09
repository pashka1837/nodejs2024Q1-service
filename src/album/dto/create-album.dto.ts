import { Equals, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  // @Equals(typeof 'string' || typeof 'boolean')
  artistId: string | null;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
