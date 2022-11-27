import axios, { AxiosError, AxiosInstance } from 'axios';
import IPlace from '../../../common/interfaces/IPlace';
import IPlaceDetailed from '../../../common/interfaces/IPlaceDetailed';

class SearchService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: process.env.VUE_APP_SEARCH_API });
  }

  private processRequest = <T>(url: string): Promise<T> =>
    this.http
      .get(url).then(response => response.data)
      .catch((error: AxiosError) => console.log(error?.code === AxiosError.ERR_NETWORK
        ? 'Search Service is not responding. Make sure the service is running.'
        : error));

  public searchByQuery = async (query?: string): Promise<IPlace[]> =>
    await this.processRequest<IPlace[]>(`?query=${query || ''}`);

  public searchById = async (id: string): Promise<IPlaceDetailed> =>
    await this.processRequest<IPlaceDetailed>(`?id=${id}`);
}

export default new SearchService();
