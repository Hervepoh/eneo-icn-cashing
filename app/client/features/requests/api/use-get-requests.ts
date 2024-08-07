import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMilliunits } from "@/lib/utils";
import axios, { AxiosRequestConfig, AxiosError } from "axios";


export const useGetRequests = () => {
  const params = useSearchParams();

  const from = params.get('from') || "";
  const to = params.get('to') || "";
  const accountId = params.get('accountId') || "";

  const query = useQuery({
    queryKey: ["requests", { from, to, accountId }],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/requests',
        headers: {
        },
        withCredentials: true, // Set this to true
        data: ''
      };

      try {
        const response = await axios.request(config);
        return response.data?.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw error;
        } else {
          throw new Error('Une erreur inconnue s\'est produite');
        }
      }

    },
  });

  return query;
};
