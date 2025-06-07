"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrapeData } from "@/types/ScrapeData";
import { useState } from "react";
import { columns } from "./columns";
import { Loader2, Plus } from "lucide-react";
import useScrape from "./hooks/useScrape";

export default function Home() {
  const { scrapedPages, isLoading, scrape } = useScrape();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOnClick = async () => {
    if (!url) {
      setError("Please enter a URL to scrape.");
      return;
    }

    try {
      await scrape(url);
      setUrl("");
    } catch (error) {
      console.error("Error scraping URL:", error);
      setError(
        "Failed to scrape the URL. Please check the console for details."
      );
    }
  };

  return (
    <main className="w-7xl mx-auto py-4 space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleOnClick} disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin mr-2" />}
          <Plus />
          Scrape
        </Button>
      </div>
      <div className="">
        <DataTable data={scrapedPages} columns={columns} />
      </div>
    </main>
  );
}
