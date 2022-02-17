type DolarHistoryAPIJSONResult = {
  date: string;
  price: number;
  tweet_url: string;
};

type DolarHistoryAPIResult = {
  date: Date;
  price: number;
  tweet_url: string;
};

type DolarHistoryAPIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DolarHistoryAPIJSONResult[];
};

export { DolarHistoryAPIJSONResult, DolarHistoryAPIResult, DolarHistoryAPIResponse };
