import React from "react";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

const SellingPoints = () => {
  return (
    <div className="bg-slate-50">
      <section className="container flex h-screen border-x border-b border-t px-0">
        <div className="flex h-full shrink basis-[800px] flex-col justify-between border-r px-12 py-14">
          <div>
            <Badge className="text-sm" variant="default">
              Funktioner
            </Badge>

            <h2 className=" mt-4 pb-14 text-5xl font-bold">Allt du behöver</h2>
          </div>

          <div>
            <h2 className=" mt-4 pb-14 text-5xl font-bold">Och mycket mer</h2>
          </div>
        </div>

        <div className="h-full grow">
          <ul className="grid h-full grid-cols-2 grid-rows-4">
            <li className=" flex flex-col gap-4 border-b border-r p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4 border-b p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4 border-b border-r p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4 border-b p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4 border-b border-r p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4 border-b p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4  border-r p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>

            <li className=" flex flex-col gap-4  p-6">
              <div className="flex items-center gap-3">
                <Check />
                <p className="font-semibold">Lorem ipsum</p>
              </div>

              <p className=" text-card-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
                eius itaque. Numquam dolores necessitatibus cum.{" "}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SellingPoints;
