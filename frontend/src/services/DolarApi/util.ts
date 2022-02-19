import axios from 'axios';
import { DolarHistoryAPIResult, DolarHistoryAPIResponse } from './types';
import dayjs from 'dayjs';

const API_URL = 'http://localhost:8000/api';

const axios_ = axios.create();
axios_.defaults.baseURL = API_URL;

const getDolarHistory = async (query_params?: {
  date__range?: [string, string];
  page?: number;
  page_size?: number;
}): Promise<DolarHistoryAPIResult[]> => {
  try {
    const response = await axios_.get<DolarHistoryAPIResponse>(
      '/dolar-history/',
      {
        params: {
          ...query_params,
          date__range: query_params?.date__range?.join(','),
        },
      }
    );

    const results: DolarHistoryAPIResult[] = response.data.results.map(
      (result) => {
        return { ...result, date: dayjs(result.date) };
      }
    );

    return results;
  } catch (error) {
    throw error;
  }
};

export { getDolarHistory };
