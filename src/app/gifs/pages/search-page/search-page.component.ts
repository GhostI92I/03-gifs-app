import { GifsService } from './../../services/gifs-service.service';
import { Component, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifsService = inject(GifsService)

  onSearch(query: string) {
    this.gifsService.searchGifs(query)
  }
}
