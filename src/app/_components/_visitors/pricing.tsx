import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

function Pricing() {
  return (
    <section className="container mx-auto flex h-screen flex-col  border-x  px-0">
      <div className="flex w-full flex-col items-center border-b pb-14 pt-14">
        <Badge className="text-sm" variant="default">
          Priser
        </Badge>

        <h1 className=" mt-4 text-center text-6xl font-bold">
          Priser efter dina behov
        </h1>
      </div>

      <div className="grid h-full grid-cols-3">
        <div className="h-full border-r px-6 pb-14 pt-10">
          <PriceCard title={"Gratis"} price={"0"} />
        </div>

        <div className="h-full border-r px-6 pb-14 pt-10">
          <PriceCard title={"Gratis"} price={"0"} />
        </div>

        <div className="h-full px-6 pb-14 pt-10">
          <PriceCard title={"Gratis"} price={"0"} />
        </div>
      </div>
    </section>
  );
}

export default Pricing;

const PriceCard = ({ title, price }: { title: string; price: string }) => {
  return (
    <Card className="flex  h-full flex-col justify-between shadow-lg">
      <div>
        <CardHeader className="text-center">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quasi minus nostrum iure labore, optio deleniti modi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-center text-4xl font-bold">
            {price}kr
            <span className="text-base font-normal text-gray-600">/ månad</span>
          </p>

          <ul className="flex flex-col gap-3 py-6">
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
            <li className="flex items-center gap-2">
              <Check className="text-green-500" /> 5 klienter
            </li>
          </ul>
        </CardContent>
      </div>

      <CardFooter>
        <Button className="w-full">Skaffa nu</Button>
      </CardFooter>
    </Card>
  );
};
