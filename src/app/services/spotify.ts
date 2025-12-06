import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Album } from '../models/album';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private token = '';

  constructor(private http: HttpClient) {}

  async getToken(): Promise<string> {
    if (this.token) return this.token;

    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      Authorization:
        'Basic ' + btoa(environment.spotifyClientId + ':' + environment.spotifyClientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const res = await firstValueFrom(
      this.http.post<{ access_token: string }>('https://accounts.spotify.com/api/token', body, {
        headers,
      })
    );

    this.token = res.access_token;
    return this.token;
  }

  /** NEW: Track → Album search so infinite scroll works */
  async searchAlbums(query: string, offset = 0, limit = 20): Promise<Album[]> {
    const token = await this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const res = await firstValueFrom(
      this.http.get<any>(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=${limit}&offset=${offset}`,
        { headers }
      )
    );

    // Extract albums from tracks
    const tracks = res.tracks?.items ?? [];

    const albums: Album[] = tracks.map((track: any) => ({
      id: track.album.id,
      name: track.album.name,
      release_date: track.album.release_date,
      images: track.album.images,
      artists: track.album.artists,
      tracks: { items: [] },
    }));

    return albums;
  }

  async getAlbumById(id: string): Promise<Album> {
    const token = await this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const res = await firstValueFrom(
      this.http.get<Album>(`https://api.spotify.com/v1/albums/${id}`, { headers })
    );

    return res;
  }
}
