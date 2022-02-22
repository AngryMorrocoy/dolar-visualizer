import dayjs, { Dayjs } from 'dayjs';

export const prettyDate = (dateObj: Dayjs | Date): string => {
  const dayJsObj = dayjs(dateObj);

  return dayJsObj.format('DD/MM/YYYY  hh:mm A');
};
