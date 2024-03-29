import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Star, Trash } from "lucide-react";
import {
  cn,
  fromDbUnitToDisplayUnit,
  hyphenEmptyString,
  showDecimalIfNotZero,
} from "~/app/_lib/utils";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { toast } from "sonner";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import {
  toggleAddEditFoodDialog,
  toggleDeleteFoodDialog,
} from "~/app/_state/coaching/data/foods/coahcingFoodsState";

export const coachingFoodColumns: ColumnDef<GetCoachingFoods>[] = [
  {
    id: "liked",
    enableHiding: false,

    cell: ({ row }) => {
      const router = useRouter();
      const changeLikeStatus = api.coachingFoods.changeLikeStatus.useMutation();
      const utils = api.useUtils();

      const likePressed = async () => {
        await changeLikeStatus.mutateAsync({
          liked: true,
          foodId: row.original.id,
        });
        await utils.coachingFoods.get.invalidate();
        router.refresh();
        toast.success(`${row.original.name} har lagts till som en favorit!`);
      };

      const dislikePressed = async () => {
        await changeLikeStatus.mutateAsync({
          liked: false,
          foodId: row.original.id,
        });
        await utils.coachingFoods.get.invalidate();
        router.refresh();

        toast.info(`${row.original.name} har tagits bort som en favorit!`);
      };

      return (
        <Button
          disabled={changeLikeStatus.isLoading}
          variant={"ghost"}
          size={"sm"}
          onClick={row.original.liked ? dislikePressed : likePressed}
        >
          <Star
            className={cn(
              " text-yellow-300",
              row.original.liked && "fill-yellow-300",
            )}
          />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Namn",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "brand",
    header: "Märke",
    cell: ({ row }) => (
      <div className=" capitalize">
        {hyphenEmptyString(row.getValue("brand"))}
      </div>
    ),
  },
  {
    accessorKey: "unit",
    header: "Enhet",
    cell: ({ row }) => (
      <div className=" capitalize">
        {fromDbUnitToDisplayUnit(row.getValue("unit"))}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Mängd",
    cell: ({ row }) => (
      <div>{showDecimalIfNotZero(+(row.getValue("amount") as string))}</div>
    ),
  },
  {
    accessorKey: "protein",
    header: "Protein",
    cell: ({ row }) => (
      <div>{showDecimalIfNotZero(+(row.getValue("protein") as string))} g</div>
    ),
  },
  {
    accessorKey: "carbs",
    header: "Kolhydrater",
    cell: ({ row }) => (
      <div>{showDecimalIfNotZero(+(row.getValue("carbs") as string))} g</div>
    ),
  },
  {
    accessorKey: "fat",
    header: "Fett",
    cell: ({ row }) => (
      <div>{showDecimalIfNotZero(+(row.getValue("fat") as string))} g</div>
    ),
  },
  {
    accessorKey: "kcal",
    header: "Kalorier",
    cell: ({ row }) => (
      <div>{showDecimalIfNotZero(+(row.getValue("kcal") as string))} kcal</div>
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
                onClick={(e) => toggleAddEditFoodDialog(true, row.original)}
              >
                <Edit className="mr-2 h-4 w-4" /> Redigera
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 focus:text-red-500"
                onClick={() =>
                  toggleDeleteFoodDialog(
                    true,
                    row.original.id,
                    row.original.name,
                  )
                }
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
