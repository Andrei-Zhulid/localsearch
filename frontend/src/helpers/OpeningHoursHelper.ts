import IOpeningHours from '../../../common/IOpeningHours';
import Days from '../../../common/enums/Days';
import ITimeInterval from '../../../common/interfaces/ITimeInterval';

class OpeningHoursHelper {
  private static previousDay = new Map<string, string>([
    [Days.Monday, ''],
    [Days.Tuesday, Days.Monday],
    [Days.Wednesday, Days.Tuesday],
    [Days.Thursday, Days.Wednesday],
    [Days.Friday, Days.Thursday],
    [Days.Saturday, Days.Friday],
    [Days.Sunday, Days.Saturday],
  ]);

  private static stringify = (intervals?: ITimeInterval[]): string =>
    intervals?.map(interval => `${interval.start} - ${interval.end}`)?.join(',') ?? 'Closed';

  public static groupByTime(schedule: IOpeningHours): Map<string, string> {
    const map = new Map<string, string>([[this.stringify(schedule.monday), Days.Monday]]);
    const week = Object.values(Days);
    week.slice(1).forEach(day => {
      const time = this.stringify(schedule[day]);
      const days = map.get(time);

      if (!days) {
        map.set(time, day);
        return;
      }

      const previousDay = this.previousDay.get(day)!;
      if (!days.endsWith(previousDay)) {
        map.set(time, `${days}, ${day}`);
        return;
      }

      if (days.endsWith(` - ${previousDay}`))
        map.set(time, days.replace(previousDay, day));
      else
        map.set(time, `${days} - ${day}`);
    });

    return map;
  }
}

export default OpeningHoursHelper;