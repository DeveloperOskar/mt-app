"use client";
import React from "react";
import { GetCoachingClient } from "~/types/_coaching/data/clients/coaching-clients";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import SelectClientComboBox from "./select-client-combobox";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const ClientsWeightProgress: React.FC<{ clients: GetCoachingClient[] }> = ({
  clients,
}) => {
  const [selectedClient, setSelectedClient] = React.useState<
    GetCoachingClient | undefined
  >(clients[0]);

  const getLabels = () => {
    if (!selectedClient) return [];
    return selectedClient.weightIns.map(
      (weightIn) => weightIn.date.split("T")[0],
    );
  };

  const getDatSet = () => {
    if (!selectedClient) return [];
    return selectedClient.weightIns.map((weightIn) => weightIn.value);
  };

  const getMin = () => {
    if (!selectedClient) return 0;
    return Math.min(
      ...selectedClient.weightIns.map((weightIn) => weightIn.value),
    );
  };

  const getMax = () => {
    if (!selectedClient) return 0;
    return Math.max(
      ...selectedClient.weightIns.map((weightIn) => weightIn.value),
    );
  };

  return (
    <Card className="w-full p-6  ">
      <CardHeader className="flex flex-row items-center justify-between px-0 pt-0">
        <div>
          <CardTitle>Viktprogression</CardTitle>

          <CardDescription>
            Följ dina klienters viktprogression över tid.
          </CardDescription>
        </div>

        <SelectClientComboBox
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          clients={clients}
        />
      </CardHeader>

      <Line
        options={{
          scales: {
            y: {
              suggestedMin: getMin() - 1,
              suggestedMax: getMax() + 1,
            },
          },
        }}
        data={{
          labels: getLabels(),
          datasets: [
            {
              label: "Vikt",
              pointBackgroundColor: "#262E3F",
              borderColor: "#262E3F",
              data: getDatSet(),
              tension: 0.1,
              pointRadius: 5,
            },
          ],
        }}
      />
    </Card>
  );
};

export default ClientsWeightProgress;
