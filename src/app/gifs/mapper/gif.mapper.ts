import { IGif } from '../interfaces/gif.interface';
import { GiphyItem } from './../interfaces/giphy.interfacefs';
export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): IGif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]): IGif[] {
    return items.map(this.mapGiphyItemToGif)
  }
}
