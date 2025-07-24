import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfacefs';

@Injectable({
  providedIn: 'root'
})
export class GifsServiceService {

  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        apikey: environment.giphyApikey,
        limit: '20',
      }
    })
  }
}
