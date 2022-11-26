import axios, { AxiosInstance } from 'axios';
import IPlace from '../../common/interfaces/IPlace';
import IApiResponse from '../src/interfaces/IApiResponce';

class SearchService {
  private cache: IPlace[] | null = null;

  constructor() {
    this.cachePlaces(); // We can preload data because it isn't changed (constant)
  }

  private cachePlaces(): void {
    try {
      const http: AxiosInstance = axios.create({ baseURL: process.env.DATA_ENDPOINT });
      const promises: Promise<IApiResponse>[] = JSON.parse(process.env.PLACES!)
        .map((place: string) => http.get(place).then(response => response.data));

      Promise.all(promises).then(responses => {
        this.cache = responses.map(response => <IPlace> {
          id: response.local_entry_id,
          name: response.displayed_what,
          address: response.displayed_where,
        });

        console.log('Cache is populated and ready to use');
      });
    } catch (error) {
      console.log('SearchService.cachePlaces() error', error);
    }
  }

  public search(query: string): IPlace[] {
    if (this.cache == null) {
      // In the real world example we need to have retries policy
      throw new Error('SearchService.cache is broken');
    }

    // if no query return all places
    if (!query) return this.cache;

    // if query doesn't contain any word character (equivalent to [a-zA-Z0-9_]) return empty result
    if (!/\w/.test(query)) return [];

    // search query starting from words boundaries
    const regExp = new RegExp(`\\b${query}`, 'i');

    return this.cache.filter(place => regExp.test(place.name) || regExp.test(place.address));
  }
}

export default new SearchService();
