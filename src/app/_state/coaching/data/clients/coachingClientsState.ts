import { observable } from "@legendapp/state";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";

export interface CoachingClientsState {
  addEditClientDialog: {
    show: boolean;
    client: GetCoachingClient | null | undefined;
  };
  deleteClientDialog: {
    show: boolean;
    client: GetCoachingClient | null | undefined;
  };
}

export const toggleAddEditClientDialog = (
  show: boolean,
  client: GetCoachingClient | null,
) => {
  coachingClientsState$.set((state) => ({
    ...state,
    addEditClientDialog: {
      show,
      client,
    },
  }));
};

export const toggleDeleteClientDialog = (
  show: boolean,
  client: GetCoachingClient | null,
) => {
  coachingClientsState$.set((state) => ({
    ...state,
    deleteClientDialog: {
      show,
      client,
    },
  }));
};

export const coachingClientsState$ = observable<CoachingClientsState>({
  addEditClientDialog: {
    show: false,
    client: null,
  },
  deleteClientDialog: {
    show: false,
    client: null,
  },
});
