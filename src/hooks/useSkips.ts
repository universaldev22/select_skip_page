"use client";

import { Skip } from "@/interfaces/skip";
import useSWR from "swr";

const API_BASE_URL = "https://app.wewantwaste.co.uk/api";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch skips");
  }
  return response.json();
};

export const useSkips = (postcode: string, area: string) => {
  const { data, error, isLoading } = useSWR<Skip[]>(
    `${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    skips: data || [],
    isLoading,
    isError: error,
  };
};
