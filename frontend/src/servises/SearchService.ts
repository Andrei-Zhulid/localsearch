import axios, { AxiosError, AxiosInstance } from 'axios';
import IPlace from '../../../common/interfaces/IPlace';

class SearchService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: process.env.VUE_APP_SEARCH_API });
  }

  public searchByQuery(query?: string): Promise<IPlace[]> {
    return this.http
      .get(`?query=${query || ''}`).then(response => response.data)
      .catch((error) => console.log((error as AxiosError)?.code === AxiosError.ERR_NETWORK
        ? 'Search Service is not responding. Make sure the service is running.'
        : error));
  }
}

export default new SearchService();
