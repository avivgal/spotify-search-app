import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../../services/spotify';
import { Album } from '../../models/album';

@Component({
  selector: 'app-disc-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './disc-details.html',
  styleUrl: './disc-details.scss',
})
export class DiscDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotify = inject(SpotifyService);

  album = signal<Album | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      this.error.set('No disc id was provided.');
      return;
    }

    this.loadAlbum(id);
  }

  async loadAlbum(id: string) {
    try {
      const album = await this.spotify.getAlbumById(id);
      this.album.set(album);
      this.error.set(null);
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'Failed to load album.');
    } finally {
      this.loading.set(false);
    }
  }

  artists = computed(() => (this.album()?.artists ?? []).map((a) => a.name).join(', '));
}
