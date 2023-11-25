import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { cn, fromDbUnitToDisplayUnit } from "~/app/_lib/utils";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { toast } from "sonner";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";

export const coachingFoodColumns: ColumnDef<GetCoachingFoods>[] = [
  {
    accessorKey: "liked",
    header: "",

    cell: ({ row }) => {
      //   const router = useRouter();
      //   const createLikeMutation = api.systemFoods.createLike.useMutation();
      //   const changeStatusMutation = api.systemFoods.likeStatus.useMutation();
      //   const utils = api.useUtils();

      const likePressed = async () => {
        alert("like pressed");
      };

      const dislikePressed = async () => {
        alert("dislike pressed");
      };

      return (
        <Button
          disabled={false}
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
    accessorKey: "brand",
    header: "Märke",
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("brand")}</div>
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
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
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
