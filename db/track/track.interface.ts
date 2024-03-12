interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface CreateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

interface UpdateTrackDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export { Track, CreateTrackDto, UpdateTrackDto };
