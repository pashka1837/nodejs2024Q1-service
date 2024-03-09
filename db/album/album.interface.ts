interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface CreateAlbumtDto {
  name: string;
  year: number;
  artistId: string | null;
}

interface UpdateAlbumtDto {
  name: string;
  year: number;
  artistId: string | null;
}

export { Album, CreateAlbumtDto, UpdateAlbumtDto };
