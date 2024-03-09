import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  artistId: string | null;
  albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  duration: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
