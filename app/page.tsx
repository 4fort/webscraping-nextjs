"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { columns } from "./columns";
import {
  AlertCircle,
  CircleArrowOutUpLeft,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import useScrape from "./hooks/useScrape";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useInputAutoFocus from "./hooks/useInputAutoFocus";

export default function Home() {
  const { scrapedPages, isLoading, error, scrape } = useScrape();
  const [urlInputValue, setUrlInputValue] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [inputError, setInputError] = useState<string | null>(null);

  const searchInputRef = useInputAutoFocus();

  const handleAddURL = async () => {
    if (!urlInputValue) {
      setInputError("Please enter a URL to scrape.");
      return;
    }

    setUrls((prev) => {
      if (prev.includes(urlInputValue)) {
        setInputError("This URL has already been added.");
        return prev;
      }
      setInputError(null);
      return [...prev, urlInputValue];
    });

    setUrlInputValue("");
  };

  const handleScrape = async () => {
    if (urls.length === 0) {
      setInputError("Please add at least one URL to scrape.");
      return;
    }

    setInputError(null);
    for (const url of urls) {
      try {
        await scrape(url);
        setUrls((prev) => prev.filter((u) => u !== url));
      } catch (error) {
        console.error("Error scraping URL:", error);
        setInputError(
          "Failed to scrape one or more URLs. Please check the console for details."
        );
      }
    }
    setUrlInputValue("");
    setInputError(null);
  };

  return (
    <main className="py-4 px-24 w-full mx-auto grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <DataTable data={scrapedPages} columns={columns} />
      </div>

      <Card className="col-span-4 sticky top-14 h-min">
        <CardHeader>
          <CardTitle>Add URL to Scrape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter url"
              type="text"
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              disabled={isLoading}
              autoFocus
              ref={searchInputRef}
            />
            <Button onClick={handleAddURL} disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              <Plus />
              Add URL
            </Button>
          </div>
          {(inputError || error) && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{inputError || error}</AlertDescription>
            </Alert>
          )}
          <div className="bg-muted rounded-md p-2">
            {urls.length > 0 ? (
              <ul className="space-y-1">
                {urls.map((u, index) => (
                  <li
                    key={index}
                    className="text-sm bg-input p-2 rounded flex items-center"
                  >
                    <span className="text-muted-foreground">{u}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => {
                        setUrls((prev) => prev.filter((url) => url !== u));
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-muted-foreground">
                No URLs added yet.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="destructive"
            onClick={() => {
              setUrls([]); // Clear the list of URLs
              setInputError(null); // Clear any error messages
            }}
            disabled={isLoading || urls.length === 0}
          >
            <Trash2 />
            Clear URLs
          </Button>
          <Button
            onClick={handleScrape}
            disabled={isLoading || urls.length === 0}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <CircleArrowOutUpLeft />
                Scrape URLs
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
