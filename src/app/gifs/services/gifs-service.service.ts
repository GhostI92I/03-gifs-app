import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfacefs';
import { IGif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)

  trendingGifs = signal<IGif[]>([])
  trendingGifsLoading = signal(true)

  // This will hold the search history, mapping query strings to arrays of IGif
  searchHistory = signal<Record<string, IGif[]>>({})
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs();
    console.log("Service created");

  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApikey,
        limit: '20',
      }
    }).subscribe((res) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({ gifs });
    })
  }

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApikey,
        q: query,
        limit: '20',
      }
    })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        // TODO: Save the search results in the search history
        tap(items => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }))
        })
      )
    /* .subscribe((res) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
      console.log({ search: gifs });
    }) */
  }
}
