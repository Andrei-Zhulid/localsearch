import IPlace from './IPlace';
import IOpeningHours from '../IOpeningHours';

interface IPlaceDetailed extends IPlace {
  website: string;
  phones: string[];
  openingHours: IOpeningHours;
}

export default IPlaceDetailed;