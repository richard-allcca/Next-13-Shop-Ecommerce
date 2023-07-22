import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interface';

// NOTE - Basic method
// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {})=> {

  // NOTE - Basic method WITHOUT Provider
  // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, fetcher, config);

  // NOTE - Method WITHOUT Fetcher
  const { data, error, isLoading } = useSWR<IProduct[]>(`/api${url}`, config);

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error
  };
};