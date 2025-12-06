import { Component, signal } from '@angular/core';
import { SpotifyService } from '../../services/spotify';
import { Album } from '../../models/album';
import { DiscItemComponent } from '../../shared/components/disc-item/disc-item';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [DiscItemComponent],
})
export class HomeComponent {
  results = signal<Album[]>([]);
  searchHistory = signal<string[]>([]);
  lastTerm = signal<string>('');
  selectedHistoryTerm = signal<string>('');

  searchInput$ = new Subject<string>();
  errorMessage = signal<string | null>(null);

  loading = signal(false);
  offset = signal(0);
  isLoadingMore = signal(false);

  constructor(private spotify: SpotifyService) {
    const saved = localStorage.getItem('search-history');
    if (saved) {
      this.searchHistory.set(JSON.parse(saved));
    }

    this.searchInput$.pipe(debounceTime(400)).subscribe((term) => {
      const trimmed = term.trim();
      if (!trimmed) return;

      this.lastTerm.set(trimmed);
      this.addToHistory(trimmed);
      this.search(trimmed);
    });

    this.search('top hits');

    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onTermChanged(term: string) {
    this.searchInput$.next(term);
  }

  onScroll = () => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;

    if (nearBottom && !this.loading() && !this.isLoadingMore()) {
      this.loadMore();
    }
  };

  private dedupeAlbums(albums: Album[]): Album[] {
    const map = new Map<string, Album>();

    for (const album of albums) {
      map.set(album.id, album);
    }

    return Array.from(map.values());
  }

  async search(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    this.lastTerm.set(trimmed);
    this.loading.set(true);
    this.offset.set(0);

    try {
      const albums = await this.spotify.searchAlbums(trimmed, 0);
      this.results.set(this.dedupeAlbums(albums));
      this.errorMessage.set(null);
    } catch (err) {
      this.results.set([]);
      this.errorMessage.set('Search failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  async loadMore() {
    const term = this.lastTerm().trim();
    if (!term) return;

    this.isLoadingMore.set(true);

    try {
      const nextOffset = this.offset() + 20;
      const more = await this.spotify.searchAlbums(term, nextOffset);

      if (more.length > 0) {
        this.results.set(this.dedupeAlbums([...this.results(), ...more]));
        this.offset.set(nextOffset);
      }
    } finally {
      this.isLoadingMore.set(false);
    }
  }

  private addToHistory(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    const updated = [trimmed, ...this.searchHistory().filter((t) => t !== trimmed)].slice(0, 5);
    this.searchHistory.set(updated);
    localStorage.setItem('search-history', JSON.stringify(updated));
  }

  selectHistoryTerm(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    this.selectedHistoryTerm.set(trimmed);
    this.lastTerm.set(trimmed);
    this.addToHistory(trimmed);
    this.search(trimmed);

    const input = document.getElementById('search-input') as HTMLInputElement | null;
    if (input) {
      input.value = trimmed;
      input.focus();
      input.selectionStart = input.selectionEnd = trimmed.length;
    }
  }
}
