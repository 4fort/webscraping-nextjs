"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      globalFilter,
      columnFilters,
      columnVisibility: {
        source: false,
        publication_date: false,
        image: false,
      },
    },
  });

  return (
    <div className="">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search or use ?tags=value to filter by tags"
          value={inputValue}
          onChange={(event) => {
            const value = event.target.value;
            setInputValue(value);

            const tagsQueryMatch = value.match(/^\?tags=(.*)$/);

            if (tagsQueryMatch) {
              const [, filterValue] = tagsQueryMatch;

              table.setColumnFilters((prev) => {
                const filteredPrev = prev.filter(
                  (filter) => filter.id !== "tags"
                );

                if (filterValue.trim()) {
                  return [
                    ...filteredPrev,
                    { id: "tags", value: filterValue.trim() },
                  ];
                } else {
                  return filteredPrev;
                }
              });

              table.setGlobalFilter("");
              return;
            }

            if (!value.startsWith("?tags=")) {
              table.setColumnFilters([]);
            }

            table.setGlobalFilter(String(value));
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
