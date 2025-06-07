"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrapeData } from "@/types/ScrapeData";
import { useState } from "react";
import { columns } from "./columns";
import { Plus } from "lucide-react";

export default function Home() {
  const [scrapedPages, setScrapedPages] = useState<ScrapeData[]>([]);

  return (
    <main className="w-7xl mx-auto py-4 space-y-4">
      <div className="flex items-center gap-2">
        <Input placeholder="Enter url" type="text" />
        <Button>
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
