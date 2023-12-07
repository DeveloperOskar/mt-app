import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { getInitials, hyphenEmptyString } from "~/app/_lib/utils";

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

export const coachingClientsColumns: ColumnDef<GetCoachingClient>[] = [
  {
    accessorKey: "imageUrl",
    enableHiding: false,
    header: "",

    cell: ({ row }) => {
      return (
        <div>
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{hyphenEmptyString(row.getValue("email"))}</div>,
  },
  {
    accessorKey: "protein",
    header: "Protein",
    cell: ({ row }) => <div>{row.getValue("protein")}g</div>,
  },
  {
    accessorKey: "carbs",
    header: "Kolhydrater",
    cell: ({ row }) => <div>{row.getValue("carbs")}g</div>,
  },
  {
    accessorKey: "fat",
    header: "Fett",
    cell: ({ row }) => <div>{row.getValue("fat")}g</div>,
  },
  {
    accessorKey: "kcal",
    header: "Kalorier",
    cell: ({ row }) => <div>{row.getValue("kcal")} kcal</div>,
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
