"use client"

import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { convertAmountFromMilliunits, formatDateRange } from "@/lib/utils";
import { formatDate, format, subDays } from 'date-fns';

export const useGetSummary = () => {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateRangeLabel, setDateRangeLabel] = useState("");

  // Fonction pour récupérer les filtres du localStorage
  const fetchFiltersFromLocalStorage = () => {
    const storedFilterQuery = localStorage.getItem('icn-filter-data-query');
    if (storedFilterQuery) {
      const result = JSON.parse(storedFilterQuery);
      setFrom(result.from ?? "");
      setTo(result.to ?? "");
    }
  };

  useEffect(() => {
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    fetchFiltersFromLocalStorage();

    if (!from && !to) {
      setFrom(format(defaultFrom, "yyyy-MM-dd"));
      setTo(format(defaultTo, "yyyy-MM-dd"));
      console.log("default value")
    }
  }, [from,to]);


  const query = useQuery({
    queryKey: ["summary", { from, to }],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:8000/api/v1/summary?from=${from}&to=${to}`,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Set this to true
      };
      console.log(config);
      try {
        const response = await axios.request(config);
        return { ...response.data?.data, dateRangeLabel };
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

