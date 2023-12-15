"use client";

import React, { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Input } from "~/app/_components/ui/input";
import {
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { coachingClientsColumns } from "./coaching-client-columns";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/app/_components/ui/table";
import { toggleAddEditClientDialog } from "~/app/_state/coaching/data/clients/coachingClientsState";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { cn } from "~/app/_lib/utils";

const CoachingClientTable: React.FC<{
  coachingClients: GetCoachingClient[];
}> = ({ coachingClients }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: coachingClients,
    columns: coachingClientsColumns,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setVisibility,
    state: {
      expanded,
      sorting: sorting,
      columnFilters: filters,
      columnVisibility: visibility,
    },
  });

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="flex shrink items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Sök efter klienter..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className=" min-w-[300px]"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Kolumner <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column, index) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={(column.id, +index)}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value: boolean) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button onClick={(e) => toggleAddEditClientDialog(true, null)}>
            Ny klient
          </Button>
        </div>

        <div className="styled-scrollbar grow overflow-auto rounded-md border bg-white">
          <Table className="bg-white">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <TableRow key={headerGroup.id + index}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead
                        className={cn(
                          "",
                          header.column.columnDef.id === "avatar" && "w-[90px]",
                          header.column.columnDef.id === "name" && "w-[180px] ",
                          header.column.columnDef.id === "goal" &&
                            "w-[170px]  ",
                          header.column.columnDef.id === "email" &&
                            "w-[280px] ",
                        )}
                        key={header.id + index}
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
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    className=" cursor-pointer"
                    key={row.id + index}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id + index} className="py-3">
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
                    colSpan={coachingClientsColumns.length + 2}
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
      </div>
    </>
  );
};

export const RegisterWeightInput: React.FC<{ clientId: number }> = ({
  clientId,
}) => {
  const [weight, setWeight] = useState<number | null>(NaN);
  const registerWeightMutation = api.coachingClients.addWeightIn.useMutation();

  const addWeight = async () => {
    if (!weight) return;

    try {
      await registerWeightMutation.mutateAsync({
        weight: weight,
        clientId,
      });

      toast.success("Vikten har registrerats!");
      setWeight(NaN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-fit items-center gap-4">
      <Input
        type="number"
        value={weight ?? 0}
        onChange={(e) => setWeight(e.target.valueAsNumber)}
        className="w-[200px]"
        placeholder="Registrera ny vikt"
      />

      <Button
        loading={registerWeightMutation.isLoading}
        onClick={addWeight}
        disabled={!weight}
      >
        Lägg till
      </Button>
    </div>
  );
};

export default CoachingClientTable;
