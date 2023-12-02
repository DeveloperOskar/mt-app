import React, { useState } from "react";
import { Toaster } from "sonner";
import CoachingClientTable from "~/app/_components/_coaching/data/clients/coaching-client-table";
import DeleteClientDialog from "~/app/_components/_coaching/data/clients/delete-client-dialog";
import { NewEditClientDialog } from "~/app/_components/_coaching/data/clients/new-edit-client-dialog";
import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";
import { api } from "~/trpc/server";

const CoachingDataClients = async () => {
  const clients = await api.coachingClients.get.query();

  return (
    <>
      <NewEditClientDialog />
      <DeleteClientDialog />

      <SingleScreenWrapper>
        <Toaster richColors duration={3000} />
        <CoachingClientTable coachingClients={clients} />
      </SingleScreenWrapper>
    </>
  );
};

export default CoachingDataClients;
