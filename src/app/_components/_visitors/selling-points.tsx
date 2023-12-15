import React from "react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

const SellingPoints = () => {
  return (
    <div className="h-[calc(100vh-70px)] bg-slate-50 py-24 ">
      <section className="container grid h-full grid-cols-[1fr_700px]">
        <div className="flex  h-full flex-col justify-between ">
          <div className="flex  flex-col gap-2">
            <Badge className="w-fit text-lg">Funktioner</Badge>
            <h1 className="text-6xl font-bold">Allt du behöver</h1>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="text-6xl font-bold">Och mycket mer</h2>
            <Button size={"lg"} className="w-fit text-lg">
              Alla funktioner
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between ">
          <Card>
            <CardHeader>
              <CardTitle>Klienter</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                consequatur ab. Voluptate laboriosam asperiores placeat dolor
                atque praesentium! Laboriosam eveniet officiis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 3</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kostschema</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                consequatur ab. Voluptate laboriosam asperiores placeat dolor
                atque praesentium! Laboriosam eveniet officiis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 3</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Träningscheman</CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                consequatur ab. Voluptate laboriosam asperiores placeat dolor
                atque praesentium! Laboriosam eveniet officiis
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 1</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 2</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-green-500" />{" "}
                  <span className="font-semibold">Något feature 3</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SellingPoints;
