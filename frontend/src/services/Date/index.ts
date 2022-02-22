import dayjs, { Dayjs } from 'dayjs';

export type DateRange = {
  start: Dayjs;
  end: Dayjs;
};

export const prettyDate = (dateObj: Dayjs | Date): string => {
  const dayJsObj = dayjs(dateObj);

  return dayJsObj.format('DD/MM/YYYY  hh:mm A');
};

export const dateRangeAsIsoDate = (dateRange: DateRange): [string, string] => {
  const isoFormat = 'YYYY-MM-DDT';

  const start: string = dateRange.start.format(isoFormat + '00:00:00Z');
  const end: string = dateRange.start.format(isoFormat + '23:59:59Z');

  return [start, end];
};
