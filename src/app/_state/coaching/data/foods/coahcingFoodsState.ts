import { observable } from "@legendapp/state";
import { GetCoachingFoods } from "~/types/_coaching/data/foods/coaching-foods";

export interface CoachingFoodsState {
  addEditFoodDialog: {
    show: boolean;
    food: GetCoachingFoods | null | undefined;
  };

  deleteFoodDialog: {
    show: boolean;
    foodId: number | null | undefined;
    foodName: string;
  };
}

export const toggleAddEditFoodDialog = (
  show: boolean,
  food: GetCoachingFoods | null,
) => {
  coachingFoodsState$.set((state) => ({
    ...state,
    addEditFoodDialog: {
      show,
      food,
    },
  }));
};
export const toggleDeleteFoodDialog = (
  show: boolean,
  foodId: number | null,
  foodName: string,
) => {
  coachingFoodsState$.set((state) => ({
    ...state,
    deleteFoodDialog: {
      show,
      foodId,
      foodName,
    },
  }));
};

export const coachingFoodsState$ = observable<CoachingFoodsState>({
  addEditFoodDialog: {
    show: false,
    food: null,
  },
  deleteFoodDialog: {
    show: false,
    foodId: null,
    foodName: "",
  },
});
