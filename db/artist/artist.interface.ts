interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

interface UpdateArtistDto {
  name: string;
  grammy: boolean;
}

export { Artist, CreateArtistDto, UpdateArtistDto };
