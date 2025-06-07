"use client";

import { ScrapeData } from "@/types/ScrapeData";
import { useState } from "react";

export default function useScrape() {
  const [scrapedPages, setScrapedPages] = useState<ScrapeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrape = async (url: string): Promise<ScrapeData> => {
    setIsLoading(true);

    const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error("Failed to scrape the URL");
    }

    const data: ScrapeData = await response.json();

    setIsLoading(false);
    setScrapedPages((prev) => {
      const page = prev.find((page) => page.headline === data.headline);
      if (page) {
        setError(`This page "${page.headline}" has already been scraped.`);
        return prev;
      }
      return [...prev, data];
    });
    return data;
  };

  return {
    scrapedPages,
    error,
    isLoading,
    scrape,
  };
}
