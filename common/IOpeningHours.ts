import Days from './enums/Days';
import ITimeInterval from './interfaces/ITimeInterval';

type IOpeningHours = {
  [key in Days]?: ITimeInterval[];
}

export default IOpeningHours;