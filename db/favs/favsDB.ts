class FavsDB {
  private artistsMap = new Map<string, string>();
  private albumsMap = new Map<string, string>();
  private tracksMap = new Map<string, string>();

  getAll() {
    return {
      artists: [...this.artistsMap.values()],
      albums: [...this.albumsMap.values()],
      tracks: [...this.tracksMap.values()],
    };
  }

  postTrack(id: string) {
    this.tracksMap.set(id, id);
  }

  deleteTrack(id: string) {
    if (!this.tracksMap.has(id)) return false;
    this.tracksMap.delete(id);
    return true;
  }

  postArtist(id: string) {
    this.artistsMap.set(id, id);
  }
  deleteArtist(id: string) {
    if (!this.artistsMap.has(id)) return false;
    this.artistsMap.delete(id);
    return true;
  }

  postAlbum(id: string) {
    this.albumsMap.set(id, id);
  }
  deleteAlbum(id: string) {
    if (!this.albumsMap.has(id)) return false;
    this.albumsMap.delete(id);
    return true;
  }
}

export const favsDB = new FavsDB();
