import axios, { AxiosInstance } from 'axios';
import IPlace from '../../common/interfaces/IPlace';
import IApiResponse from '../src/interfaces/IApiResponce';
import IPlaceDetailed from '../../common/interfaces/IPlaceDetailed';
import ContactType from '../../common/enums/ContactType';

class SearchService {
  private cache: IPlaceDetailed[] | null = null;

  constructor() {
    this.cachePlaces(); // We can preload data because it isn't changed (constant)
  }

  private convertToIPlaceDetailed(apiResponse: IApiResponse): IPlaceDetailed {
    return <IPlaceDetailed>{
      id: apiResponse.local_entry_id,
      name: apiResponse.displayed_what,
      address: apiResponse.displayed_where,
      phones: apiResponse.addresses?.[0]?.contacts?.filter(contact => contact.contact_type === ContactType.Phone)
        .map(contact => contact.call_link),
      website: apiResponse.addresses?.[0]?.contacts?.find(contact => contact.contact_type === ContactType.Url)?.url,
      openingHours: apiResponse.opening_hours.days
    }
  }

  private convertToIPlace({ address, id, name }: IPlaceDetailed): IPlace {
    return <IPlace>{ id, name, address };
  }

  private cachePlaces(): void {
    try {
      const http: AxiosInstance = axios.create({ baseURL: process.env.DATA_ENDPOINT });
      const promises: Promise<IApiResponse>[] = JSON.parse(process.env.PLACES!)
        .map((place: string) => http.get(place).then(response => response.data));

      Promise.all(promises).then(responses => {
        this.cache = responses.map(response => this.convertToIPlaceDetailed(response));

        console.log('Cache is populated and ready to use');
      });
    } catch (error) {
      console.log('SearchService.cachePlaces() error', error);
    }
  }

  private cacheHealthCheck(): void {
    if (this.cache == null) {
      // In the real world example we need to have retries policy
      throw new Error('SearchService.cache is broken');
    }
  }

  public search(query: string): IPlace[] {
    this.cacheHealthCheck();

    // if no query return all places
    if (!query) return this.cache!.map(placeDetails => this.convertToIPlace(placeDetails));

    // if query doesn't contain any word character (equivalent to [a-zA-Z0-9_]) return empty result
    if (!/\w/.test(query)) return [];

    // search query starting from words boundaries
    const regExp = new RegExp(`\\b${query}`, 'i');

    return this.cache!
      .filter(place => regExp.test(place.name) || regExp.test(place.address))
      .map(placeDetails => this.convertToIPlace(placeDetails));
  }

  public getPlaceDetails(id: string): IPlaceDetailed | null {
    this.cacheHealthCheck();

    return this.cache!.find(place => place.id === id) ?? null;
  }
}

export default new SearchService();
