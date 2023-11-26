import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { cn, fromDbUnitToDisplayUnit } from "~/app/_lib/utils";
import { api } from "~/trpc/react";
import { GetSystemFood } from "~/types/_coaching/data/foods/system-foods";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { toast } from "sonner";

export const SystemFoodColumns: ColumnDef<GetSystemFood>[] = [
  {
    accessorKey: "liked",
    header: "",
    enableHiding: false,

    cell: ({ row }) => {
      const router = useRouter();
      const createLikeMutation = api.systemFoods.createLike.useMutation();
      const changeStatusMutation = api.systemFoods.likeStatus.useMutation();
      const utils = api.useUtils();

      const likePressed = async () => {
        if (row.original.likeId === null) {
          await createLikeMutation.mutateAsync({
            liked: true,
            systemFoodId: row.original.id,
          });
        } else {
          await changeStatusMutation.mutateAsync({
            id: row.original.likeId,
            liked: !row.original.liked,
          });
        }

        await utils.systemFoods.invalidate();
        router.refresh();
        toast.success(`${row.original.name} har lagts till som en favorit!`);
      };

      const dislikePressed = async () => {
        if (!row.original.likeId) return;

        await changeStatusMutation.mutateAsync({
          id: row.original.likeId,
          liked: false,
        });

        await utils.systemFoods.invalidate();
        router.refresh();
        toast.info(`${row.original.name} har tagits bort som en favorit!`);
      };

      return (
        <Button
          disabled={
            changeStatusMutation.isLoading || createLikeMutation.isLoading
          }
          variant={"ghost"}
          size={"sm"}
          onClick={row.original.liked ? dislikePressed : likePressed}
        >
          <Star
            className={cn(
              " text-yellow-500",
              row.original.liked && "fill-yellow-500",
            )}
          />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Namn",
    cell: ({ row }) => <div>{row.getValue("name")}g</div>,
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
];
