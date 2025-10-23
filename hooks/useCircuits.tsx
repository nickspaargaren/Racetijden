import axios from "axios";
import useSWR, { Fetcher } from "swr";

const useCircuits = <T extends object>(url: string) => {
  const fetcher: Fetcher<T, string> = (url) =>
    axios
      .get<T>(url, {
        params: {
          apikey: process.env.API_KEY,
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR<T, Error>(url, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useCircuits;
