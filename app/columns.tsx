"use client";

import { ScrapeData } from "@/types/ScrapeData";
import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.getValue<ScrapeData["tags"]>("tags").map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    ),
  },
];
