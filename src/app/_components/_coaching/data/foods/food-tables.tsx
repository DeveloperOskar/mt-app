"use client";
import React, { useState } from "react";
import { SystemFoodsTable } from "./system-foods-table";
import { GetSystemFood } from "~/types/_coaching/data/foods/system-foods";
import { Input } from "~/app/_components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/app/_components/ui/button";
import { SystemFoodColumns } from "./system-food-columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { NewEditFoodDialog } from "./new-edit-food-dialog";
import { CoachingFoodsTable } from "./coaching-foods-table";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";
import { coachingFoodColumns } from "./coaching-foods-columns";

type TableTypes = "system" | "coaching";

const FoodTables = ({
  systemFoods,
  coachingFoods,
}: {
  systemFoods: GetSystemFood[];
  coachingFoods: GetCoachingFoods[];
}) => {
  const [openEditFoodDialog, setOpenEditFoodDialog] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableTypes>(
    coachingFoods.length > 0 ? "coaching" : "system",
  );

  const [systemFoodsSorting, setSystemFoodsSorting] = useState<SortingState>(
    [],
  );
  const [systemFoodsColumnFilters, setSystemFoodsColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [systemFoodsColumnVisibility, systemFoodsSetColumnVisibility] =
    useState<VisibilityState>({});

  const systemFoodsTable = useReactTable({
    data: systemFoods,
    columns: SystemFoodColumns,
    onSortingChange: setSystemFoodsSorting,
    onColumnFiltersChange: setSystemFoodsColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: systemFoodsSetColumnVisibility,
    state: {
      sorting: systemFoodsSorting,
      columnFilters: systemFoodsColumnFilters,
      columnVisibility: systemFoodsColumnVisibility,
    },
  });

  const [coachingFoodsSorting, setCoachingFoodsSorting] =
    React.useState<SortingState>([]);
  const [coachingFoodsColumnFilters, setCoachingFoodsColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [coachingFoodsColumnVisibility, systemCoachingSetColumnVisibility] =
    React.useState<VisibilityState>({});

  const coachingFoodsTable = useReactTable({
    data: coachingFoods,
    columns: coachingFoodColumns,
    onSortingChange: setCoachingFoodsSorting,
    onColumnFiltersChange: setCoachingFoodsColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: systemCoachingSetColumnVisibility,
    state: {
      sorting: coachingFoodsSorting,
      columnFilters: coachingFoodsColumnFilters,
      columnVisibility: coachingFoodsColumnVisibility,
    },
  });

  const getActiveTable = () => {
    if (selectedTable === "system") return systemFoodsTable;
    else return coachingFoodsTable;
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex shrink items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Sök efter livsmedel..."
            value={
              selectedTable === "system"
                ? (systemFoodsTable
                    .getColumn("name")
                    ?.getFilterValue() as string) ?? ""
                : (coachingFoodsTable
                    .getColumn("name")
                    ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              selectedTable === "system"
                ? systemFoodsTable
                    .getColumn("name")
                    ?.setFilterValue(event.target.value)
                : coachingFoodsTable
                    .getColumn("name")
                    ?.setFilterValue(event.target.value)
            }
            className=" min-w-[300px]"
          />

          <Select
            value={selectedTable}
            onValueChange={(val: TableTypes) => {
              setSelectedTable(val);
            }}
          >
            <SelectTrigger className=" min-w-[250px]">
              <SelectValue placeholder="Dina livsmedel" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Livsmedelsgrupp</SelectLabel>
                <SelectItem value="coaching">Dina livsmedel</SelectItem>
                <SelectItem value="system">Systemets livsmedel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Kolumner <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {getActiveTable()
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
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

        <Button onClick={(e) => setOpenEditFoodDialog(true)}>
          Nytt livsmedel
        </Button>

        <NewEditFoodDialog
          dialogOpen={openEditFoodDialog}
          handleToggleDialog={setOpenEditFoodDialog}
        />
      </div>

      {selectedTable === "system" && (
        <SystemFoodsTable table={systemFoodsTable} />
      )}

      {selectedTable === "coaching" && (
        <CoachingFoodsTable table={coachingFoodsTable} />
      )}
    </div>
  );
};

export default FoodTables;
