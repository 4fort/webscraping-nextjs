"use client";

import { ScrapeData } from "@/types/ScrapeData";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ScrapeData>[] = [
  {
    accessorKey: "headline",
    header: "Headline",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <h2 className="font-bold w-sm wrap-break-word whitespace-break-spaces">
          {row.getValue("headline")}
        </h2>
        <span className="text-xs text-muted-foreground italic mt-1">
          {row.getValue("source")}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.getValue("publication_date") === "No publication date found"
            ? row.getValue("publication_date")
            : new Date(row.getValue("publication_date")).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}
          {row.getValue("publication_date") !== "No publication date found" && (
            <>
              {" "}
              at{" "}
              {new Date(row.getValue("publication_date")).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </>
          )}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("author")}</span>
    ),
  },
  {
    accessorKey: "publication_date",
    // header: "Publication Date",
    // cell: ({ row }) => (
    //   <span className="text-sm">{row.getValue("publication_date")}</span>
    // ),
  },
  {
    accessorKey: "source",
    // header: "Source",
    // cell: ({ row }) => (
    //   <span className="text-sm">{row.getValue("source")}</span>
    // ),
  },
  {
    accessorKey: "image",
    // header: "Image",
    // cell: ({ row }) => (
    //   <img
    //     src={row.getValue("image")}
    //     alt="Article Image"
    //     className="w-16 h-16 object-cover"
    //   />
    // ),
  },
  {
    accessorKey: "relevance",
    header: "Relevance",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("relevance")}%</Badge>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue<ScrapeData["tags"]>("tags");
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const tags = row.getValue(id) as string[];
      return tags.some((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
];
