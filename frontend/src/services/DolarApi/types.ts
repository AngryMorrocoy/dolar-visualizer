import { Dayjs } from 'dayjs';

export type DolarHistoryAPIJSONResult = {
  date: string;
  price: number;
  tweet_url: string;
};

export type DolarHistoryAPIResult = {
  date: Dayjs;
  price: number;
  tweet_url: string;
};

export type DolarHistoryAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DolarHistoryAPIJSONResult[];
};
