import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Star, Trash } from "lucide-react";
import { cn, fromDbUnitToDisplayUnit } from "~/app/_lib/utils";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { SetStateAction, useState } from "react";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import { NewEditClientDialog } from "./new-edit-client-dialog";
import DeleteClientDialog from "./delete-client-dialog";

export const coachingClientsColumns: ColumnDef<GetCoachingClient>[] = [
  {
    accessorKey: "imageUrl",
    enableHiding: false,
    header: "",

    cell: ({ row }) => {
      return (
        <div>
          <Avatar className="">
            <AvatarImage
              src={
                !row.original.imageUrl
                  ? "/default_client.png"
                  : row.original.imageUrl
              }
            />
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
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
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
      const [openEditClientDialog, setOpenEditClientDialog] = useState(false);
      const [openDeleteClientDialog, setOpenDeleteClientDialog] =
        useState(false);

      return (
        <>
          <NewEditClientDialog
            dialogOpen={openEditClientDialog}
            handleToggleDialog={setOpenEditClientDialog}
            client={row.original}
          />
          <DeleteClientDialog
            handleToggleDialog={setOpenDeleteClientDialog}
            dialogOpen={openDeleteClientDialog}
            clientId={row.original.id}
            clientName={row.original.name}
          />

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

              <DropdownMenuItem onClick={(e) => setOpenEditClientDialog(true)}>
                <Edit className="mr-2 h-4 w-4" /> Redigera
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenDeleteClientDialog(true)}
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
