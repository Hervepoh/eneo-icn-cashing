"use client"

import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { convertAmountFromMilliunits, formatDateRange } from "@/lib/utils";
import { formatDate, subDays } from 'date-fns';


export const useGetSummary = () => {

  const params = useSearchParams();

  const fromParam = params.get('from') || "";
  const toParam = params.get('to') || "";
  const accountId = params.get('accountId') || "";

  const defaultTo = formatDate(new Date(), 'dd/MM/yyyy');
  const defaultFrom = formatDate(subDays(defaultTo, 30), 'dd/MM/yyyy');

  const from = fromParam ? formatDate(fromParam, 'dd/MM/yyyy') : defaultFrom;
  const to = toParam ? formatDate(toParam, 'dd/MM/yyyy') : defaultTo;
  const dateRangeLabel = formatDateRange({ from, to });

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      let data = JSON.stringify({
        "from": "01/08/2024",
        "to": "09/08/2024"
      });

      const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/summary',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Set this to true
        data: JSON.stringify({
          "from": "01/08/2024",
          "to": "09/08/2024"
        })
      };

      try {
        const response = await axios.request(config);
        return {...response.data?.data , dateRangeLabel};
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

