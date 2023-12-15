import { ColumnDef } from "@tanstack/react-table";
import {
  Edit,
  MoreHorizontal,
  Scale,
  Trash,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  getInitials,
  hyphenEmptyString,
  showDecimalIfNotZero,
} from "~/app/_lib/utils";

import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import {
  toggleAddEditClientDialog,
  toggleDeleteClientDialog,
} from "~/app/_state/coaching/data/clients/coachingClientsState";
import { Badge } from "~/app/_components/ui/badge";

export const coachingClientsColumns: ColumnDef<GetCoachingClient>[] = [
  {
    id: "avatar",
    enableHiding: false,

    cell: ({ row }) => {
      return (
        <div
          onClick={() => {
            row.toggleExpanded(!row.getIsExpanded());
          }}
        >
          <Avatar className="">
            <AvatarFallback
              style={{
                backgroundColor: row.original.backgroundColor,
                color: row.original.textColor,
              }}
              className="h-10 w-10 font-semibold uppercase"
            >
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Namn",
    id: "name",
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("name")}</div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    id: "email",
    cell: ({ row }) => (
      <div
        onClick={() => {
          row.toggleExpanded(!row.getIsExpanded());
        }}
      >
        {hyphenEmptyString(row.getValue("email"))}
      </div>
    ),
  },

  {
    enableHiding: true,
    id: "goal",
    header: "Mål",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.goal === "lose" && (
            <Badge
              variant={"outline"}
              className="flex w-fit items-center gap-2"
            >
              <span>Gå ner i vikt</span>{" "}
              <TrendingDown className="h-4 w-5 text-gray-900" />
            </Badge>
          )}

          {row.original.goal === "gain" && (
            <Badge
              variant={"outline"}
              className="flex w-fit items-center gap-2"
            >
              <span>Gå upp i vikt</span>{" "}
              <TrendingUp className="h-4 w-5 text-gray-900" />
            </Badge>
          )}

          {row.original.goal === "maintain" && (
            <Badge
              variant={"outline"}
              className="flex w-fit items-center gap-2"
            >
              <span>Behålla vikt</span>{" "}
              <Scale className="h-4 w-5 text-gray-900" />
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "weightIns",
    header: "Vikt",
    id: "weight",
    cell: ({ row }) => (
      <div>
        {row.original.weightIns[row.original.weightIns.length - 1]?.value ??
          "-"}{" "}
        kg
      </div>
    ),
  },
  {
    accessorKey: "fatPercentages",
    header: "Fettprocent",
    id: "fatPercentages",
    cell: ({ row }) => (
      <div>
        {showDecimalIfNotZero(
          row.original.fatPercentages[row.original.fatPercentages.length - 1]
            ?.value ?? 0,
        )}{" "}
        %
      </div>
    ),
  },

  {
    accessorKey: "protein",
    header: "Protein",
    cell: ({ row }) => (
      <div
        onClick={() => {
          row.toggleExpanded(!row.getIsExpanded());
        }}
      >
        {row.getValue("protein")} g
      </div>
    ),
  },
  {
    accessorKey: "carbs",
    header: "Kolhydrater",
    cell: ({ row }) => (
      <div
        onClick={() => {
          row.toggleExpanded(!row.getIsExpanded());
        }}
      >
        {row.getValue("carbs")} g
      </div>
    ),
  },
  {
    accessorKey: "fat",
    header: "Fett",
    cell: ({ row }) => (
      <div
        onClick={() => {
          row.toggleExpanded(!row.getIsExpanded());
        }}
      >
        {row.getValue("fat")} g
      </div>
    ),
  },
  {
    accessorKey: "kcal",
    header: "Kalorier",
    cell: ({ row }) => (
      <div
        onClick={() => {
          row.toggleExpanded(!row.getIsExpanded());
        }}
      >
        {row.getValue("kcal")} kcal
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-4 min-w-[150px]" align="end">
              <DropdownMenuLabel>Hantera</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => toggleAddEditClientDialog(true, row.original)}
              >
                <Edit className="mr-2 h-4 w-4" /> Redigera
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => toggleDeleteClientDialog(true, row.original)}
                className="text-red-600 focus:text-red-500"
              >
                <Trash className="mr-2 h-4 w-4" /> Ta bort
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
