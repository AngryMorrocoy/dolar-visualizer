import axios from 'axios';
import { DolarHistoryAPIResult, DolarHistoryAPIResponse } from './types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const API_URL = import.meta.env.DEV ? 'http://localhost:8000/api' : '/api';

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
        return { ...result, date: dayjs(result.date, 'YYYY-MM-DDTHH-mm') };
      }
    );

    return results;
  } catch (error) {
    throw error;
  }
};

export { getDolarHistory };
