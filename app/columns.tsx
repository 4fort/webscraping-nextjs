"use client";

import { ScrapeData } from "@/types/ScrapeData";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<ScrapeData>[] = [
  {
    accessorKey: "headline",
    header: "Headline",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("headline")}</span>
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
    header: "Publication Date",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("publication_date")}</span>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("source")}</span>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt="Article Image"
        className="w-16 h-16 object-cover"
      />
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
  },
];
