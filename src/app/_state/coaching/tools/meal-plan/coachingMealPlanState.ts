import { observable } from "@legendapp/state";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";

export interface TransferFoodData {
  id: number | string;
  name: string;
  brand: string;
  protein: number;
  amount: number;
  carbs: number;
  fat: number;
  kcal: number;
  liked?: boolean;
  coachingFoods: boolean;
  calculatedProtein: number;
  calculatedCarbs: number;
  calculatedFat: number;
  calculatedKcal: number;
}

export interface MealPlanMeal {
  name: string;
  description: string;
  foods: TransferFoodData[];
  id: string;
}

export interface CoachingMealPlanState {
  selectClientDialog: {
    show: boolean;
    selectedClient: undefined | GetCoachingClient;
  };
  meals: MealPlanMeal[];
}

export const defaultState: CoachingMealPlanState = {
  selectClientDialog: {
    show: false,
    selectedClient: undefined,
  },

  meals: [
    {
      name: "Måltid 1",
      description: "",
      id: "1",
      foods: [],
    },
  ],
};

export const deleteMeal = (id: string) => {
  coachingMealPlanState$.set((state) => ({
    ...state,
    meals: state.meals.filter((meal) => meal.id !== id),
  }));
};

export const selectedClient = (
  client: GetCoachingClient | undefined,
  showDialog: boolean,
) => {
  coachingMealPlanState$.set((state) => ({
    ...state,
    selectClientDialog: {
      ...state.selectClientDialog,
      show: showDialog,
      selectedClient: client,
    },
  }));
};

export const coachingMealPlanState$ = observable<CoachingMealPlanState>({
  ...defaultState,
});

export const amountChanged = (
  meal: MealPlanMeal,
  food: TransferFoodData,
  foodIndex: number,
  amount: number,
) => {
  const protein = food.protein / 100;
  const carbs = food.carbs / 100;
  const fat = food.fat / 100;
  const kcal = food.kcal / 100;

  const calculatedProtein = protein * amount;
  const calculatedCarbs = carbs * amount;
  const calculatedFat = fat * amount;
  const calculatedKcal = kcal * amount;

  coachingMealPlanState$.set((state) => ({
    ...state,

    meals: state.meals.map((m) => {
      if (m.id === meal.id) {
        return {
          ...m,
          foods: m.foods.map((f, i) => {
            if (f.id === food.id && foodIndex === i) {
              return {
                ...f,
                amount,
                calculatedProtein,
                calculatedCarbs,
                calculatedFat,
                calculatedKcal,
              };
            }
            return f;
          }),
        };
      }
      return m;
    }),
  }));
};

export const addNewMeal = (meal: MealPlanMeal) => {
  coachingMealPlanState$.set((state) => ({
    ...state,
    meals: [...state.meals, meal],
  }));
};

export const addFoodToMeal = (mealId: string, food: TransferFoodData) => {
  coachingMealPlanState$.set((state) => ({
    ...state,
    meals: state.meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: [...meal.foods, food],
        };
      }
      return meal;
    }),
  }));
};

export const removeFoodFromMeal = (mealId: string, foodIndex: number) => {
  coachingMealPlanState$.set((state) => ({
    ...state,
    meals: state.meals.map((meal) => {
      if (meal.id === mealId) {
        return {
          ...meal,
          foods: meal.foods.filter((food, index) => index !== foodIndex),
        };
      }
      return meal;
    }),
  }));
};
