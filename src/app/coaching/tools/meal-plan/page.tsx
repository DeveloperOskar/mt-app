import { redirect } from "next/navigation";
import React from "react";
import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";
import Content from "~/app/_components/_coaching/tools/meal-plan/content";
import FoodPicker from "~/app/_components/_coaching/tools/meal-plan/food-picker";
import LoadingState from "~/app/_components/_coaching/tools/meal-plan/loading-state";
import SelectClientDialog from "~/app/_components/_coaching/tools/meal-plan/select-client-dialog";
import Summary from "~/app/_components/_coaching/tools/meal-plan/summary";
import { Card } from "~/app/_components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const MealPlan = async () => {
  const foodsPromise = api.coachingFoods.get.query();
  const systemPromise = api.systemFoods.get.query();
  const clientsPromise = api.coachingClients.get.query();
  const sessionPromise = getServerAuthSession();

  const [coachingFoods, systemFoods, clients, session] = await Promise.all([
    foodsPromise,
    systemPromise,
    clientsPromise,
    sessionPromise,
  ]);

  if (!session?.user) {
    throw redirect("/sign-in");
  }

  return (
    <SingleScreenWrapper className="flex justify-between p-0">
      <SelectClientDialog clients={clients} />
      <FoodPicker coachingFoods={coachingFoods} systemFoods={systemFoods} />
      <Content userName={session.user.name ?? ""} />
      <Summary />
    </SingleScreenWrapper>
  );
};

export default MealPlan;
