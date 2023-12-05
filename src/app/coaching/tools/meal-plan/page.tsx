import React from "react";
import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";
import Content from "~/app/_components/_coaching/tools/meal-plan/content";
import FoodPicker from "~/app/_components/_coaching/tools/meal-plan/food-picker";
import SelectClientDialog from "~/app/_components/_coaching/tools/meal-plan/select-client-dialog";
import Summary from "~/app/_components/_coaching/tools/meal-plan/summary";
import { api } from "~/trpc/server";

const MealPlan = async () => {
  const foodsPromise = api.coachingFoods.get.query();
  const systemPromise = api.systemFoods.get.query();
  const clientsPromise = api.coachingClients.get.query();

  const [coachingFoods, systemFoods, clients] = await Promise.all([
    foodsPromise,
    systemPromise,
    clientsPromise,
  ]);

  return (
    <SingleScreenWrapper className="flex justify-between p-0">
      <SelectClientDialog clients={clients} />
      <FoodPicker coachingFoods={coachingFoods} systemFoods={systemFoods} />
      <Content />
      <Summary />
    </SingleScreenWrapper>
  );
};

export default MealPlan;
