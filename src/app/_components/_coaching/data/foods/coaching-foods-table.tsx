"use client";

import * as React from "react";
import { flexRender, Table as TableType } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { Button } from "~/app/_components/ui/button";
import { SystemFoodColumns } from "./system-food-columns";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";
import { cn } from "~/app/_lib/utils";

export const CoachingFoodsTable = ({
  table,
}: {
  table: TableType<GetCoachingFoods>;
}) => {
  return (
    <>
      <div className="styled-scrollbar grow overflow-auto rounded-md border bg-white">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        "",
                        header.column.columnDef.id === "liked" && "w-[90px] ",
                        header.column.columnDef.id === "actions" && "w-[90px] ",
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={SystemFoodColumns.length + 3}
                  className="h-24 text-center"
                >
                  Inga resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex shrink items-center justify-end  gap-4 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Föregående sida
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Nästa sida
        </Button>
      </div>
    </>
  );
};
