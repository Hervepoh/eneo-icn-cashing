import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { convertAmountFromMilliunits } from "@/lib/utils";



export const useGetSummary = () => {
  const params = useSearchParams();

  const from = params.get('from') || "";
  const to = params.get('to') || "";
  const accountId = params.get('accountId') || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      let data = JSON.stringify({
        "from": from,
        "to": to
      });
      const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/summary',
        headers: {
        },
        withCredentials: true, // Set this to true
        data: data
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
}

