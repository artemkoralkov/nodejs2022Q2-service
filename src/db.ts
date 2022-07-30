import { Album } from './modules/albums/interfaces/albums.interface';
import { Artist } from './modules/artists/interfaces/artist.interface';
import { Favorites } from './modules/favorites/interfaces/favorite.interface';
import { Track } from './modules/tracks/interfaces/track.interface';
import { User } from './modules/users/interfaces/user.interface';

class DataBase {
  private artists: Artist[] = [];
  private tracks: Track[] = [];
  private users: User[] = [];
  private albums: Album[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addTrackToTheFavorites(trackId: string) {
    this.favorites.tracks.push(trackId);
  }

  deleteTrackFromFavorites(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track !== trackId,
    );
  }

  isTrackInFavorites(id: string) {
    return this.favorites.tracks.includes(id);
  }

  addArtistToTheFavorites(artistId: string) {
    this.favorites.artists.push(artistId);
  }

  deleteArtistFromFavorites(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist !== artistId,
    );
  }

  isArtistInFavorites(id: string) {
    return this.favorites.artists.includes(id);
  }

  addAlbumToTheFavorites(albumId: string) {
    this.favorites.albums.push(albumId);
  }

  deleteAlbumFromFavorites(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album !== albumId,
    );
  }

  isAlbumInFavorites(id: string) {
    return this.favorites.albums.includes(id);
  }

  getFavorites() {
    return {
      artists: this.favorites.artists.map((id) => this.getArtist(id)),
      albums: this.favorites.albums.map((id) => this.getAlbum(id)),
      tracks: this.favorites.tracks.map((id) => this.getTrack(id)),
    };
  }

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id != id);
    this.deleteArtistFromFavorites(id);
    const track = this.tracks.find((track) => track.artistId === id);
    if (track) {
      track.artistId = null;
    }
    const album = this.albums.find((album) => album.artistId === id);
    if (album) {
      album.artistId = null;
    }
  }

  getArtists() {
    return this.artists;
  }

  getArtist(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  deleteUser(id: string) {
    this.users = this.users = this.users.filter((user) => user.id != id);
  }

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
    this.deleteAlbumFromFavorites(id);
    const track = this.tracks.find((track) => track.albumId === id);
    if (track) {
      track.albumId = null;
    }
  }

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((track) => track.id != id);
    this.deleteTrackFromFavorites(id);
  }

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    return this.tracks.find((track) => track.id === id);
  }
}

export const db = new DataBase();
