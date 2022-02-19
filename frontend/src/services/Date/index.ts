import dayjs from 'dayjs';

export const prettyDate = (dateObj: Date): string => {
  const dayJsObj = dayjs(dateObj);

  return dayJsObj.format('DD/MM/YYYY  hh:mm A');
};
