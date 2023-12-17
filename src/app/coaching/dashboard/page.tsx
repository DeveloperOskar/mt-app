import React from "react";
import { api } from "~/trpc/server";

import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";
import ClientsProgress from "~/app/_components/_coaching/dashboard/clients-progress";

const CoachingDashboard = async () => {
  const clients = await api.coachingClients.get.query();

  return (
    <SingleScreenWrapper>
      <ClientsProgress clients={clients} />
    </SingleScreenWrapper>
  );
};

export default CoachingDashboard;
