import React from "react";
import FoodTables from "~/app/_components/_coaching/data/foods/food-tables";
import { api } from "~/trpc/server";
import { Toaster } from "sonner";
import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";

const CoachingDataFoods = async () => {
  const systemFoodsPromise = api.systemFoods.get.query();
  const coachingFoodsPromise = api.coachingFoods.get.query();

  const [systemFoods, coachingFoods] = await Promise.all([
    systemFoodsPromise,
    coachingFoodsPromise,
  ]);

  return (
    <SingleScreenWrapper>
      <Toaster richColors duration={3000} />
      <FoodTables systemFoods={systemFoods} coachingFoods={coachingFoods} />
    </SingleScreenWrapper>
  );
};

export default CoachingDataFoods;
