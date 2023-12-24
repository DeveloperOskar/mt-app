import React from "react";
import { api } from "~/trpc/server";

import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";
import ClientsWeightProgress from "~/app/_components/_coaching/dashboard/clients-weight-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import ClientsFatPercentageProgress from "~/app/_components/_coaching/dashboard/clients-fat-percentage-progress";
import { Badge } from "~/app/_components/ui/badge";

const CoachingDashboard = async () => {
  const clients = await api.coachingClients.get.query();

  return (
    <SingleScreenWrapper>
      <div className=" grid  h-full grid-rows-[25%_75%]  gap-8 px-10 pb-10">
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-8">
          <Card>sdf</Card>
          <Card>sdf</Card>
          <Card>sdf</Card>

          <Card>
            <CardHeader className="text-center">
              <CardDescription>Ditt abonemang</CardDescription>
              <CardTitle>
                <Badge className="text-xl">Gratis</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <h2 className="text-4xl font-bold">
                0kr
                <span className="text-sm font-normal text-muted-foreground">
                  /månad
                </span>
              </h2>
              <CardDescription>Förnyas 2023-12-31</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <ClientsWeightProgress clients={clients} />
          <ClientsFatPercentageProgress clients={clients} />
        </div>
      </div>
    </SingleScreenWrapper>
  );
};

export default CoachingDashboard;
