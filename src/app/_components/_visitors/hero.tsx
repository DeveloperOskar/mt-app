import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto grid  min-h-[calc(100vh-70px)]  grid-cols-[1fr_720px] items-center gap-14">
      <div>
        <div className="flex  flex-col gap-2">
          <Badge className="w-fit text-lg">MyTeam</Badge>
          <h1 className="text-6xl font-bold">
            Ta din coaching till<br></br> nästa nivå
          </h1>
          <p className="text-xl text-card-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Asperiores, nisi id minima, ab minus repellendus ducimus magnam
            laudantium iure rerum. Lorem ipsum dolor sit amet. laudantium iure
            rerum. Lorem ipsum dolor sit amet.
          </p>
        </div>

        <ul className="flex flex-col gap-1 py-10">
          <li className="flex items-center gap-4 ">
            <Check className="h-5 w-5" />

            <span className="text-lg font-semibold ">Öka dina intekter</span>
          </li>
          <li className="flex items-center gap-4">
            <Check className="h-5 w-5" />
            <span className="text-lg font-semibold">Hälp fler</span>
          </li>
          <li className="flex items-center gap-4">
            <Check className="h-5 w-5" />

            <span className="text-lg font-semibold ">Arbeta mer effektivt</span>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Button className="text-lg" size={"lg"}>
            Gå med
          </Button>

          <Button className="text-lg" size={"lg"} variant={"outline"}>
            Läs mer
          </Button>
        </div>
      </div>

      <div>
        <Image
          alt="Rend.ai Image"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          height="550"
          src="https://generated.vusercontent.net/placeholder.svg"
          width="310"
        />
      </div>
    </section>
  );
};

export default Hero;
