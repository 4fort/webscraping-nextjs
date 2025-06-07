"use client";

import { ScrapeData } from "@/types/ScrapeData";
import { useState } from "react";

export default function useScrape() {
  const [scrapedPages, setScrapedPages] = useState<ScrapeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Scrapes the given URL and returns the scraped data.
   * @param url - The URL to scrape.
   * @returns A promise that resolves to the scraped data.
   */
  const scrape = async (url: string): Promise<ScrapeData> => {
    setIsLoading(true);

    const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error("Failed to scrape the URL");
    }

    const data: ScrapeData = await response.json();

    console.log("Scraped data:", data);

    setIsLoading(false);
    setScrapedPages((prev) => [...prev, data]);
    return data;
  };

  return {
    scrapedPages,
    isLoading,
    scrape,
  };
}
