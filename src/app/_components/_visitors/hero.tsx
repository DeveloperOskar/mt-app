import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col items-center border-x px-0 py-14">
      <div className="w-full border-b pb-12">
        <h1 className="text-center text-7xl font-bold">
          Ta din coaching till <br />
          <span className="underline">nästa</span> nivå
        </h1>

        <p className="mx-auto  block max-w-[950px] py-8 text-center text-2xl text-card-foreground">
          Maximera din framgång som coach med MyTeams webbaserade gränssnitt.
          Öka din inkomst och överträffa dina konkurrenter med den senaste
          tekniken. Ta din coaching till nästa nivå och låt oss hjälpa dig att
          nå nya höjder!
        </p>

        <div className="mx-auto flex  items-center justify-center gap-4">
          <Link href={"/information"}>
            <Button className="text-base" variant={"outline"} size={"lg"}>
              Lär dig mer
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button className="text-base" size={"lg"}>
              Gå med nu
            </Button>
          </Link>
        </div>
      </div>

      <div className="px-6 pt-12">
        <Card className=" rounded-lg shadow-none ">
          <Image
            priority={true}
            className="h-full w-auto rounded-lg  object-cover"
            src={"/hero-img-min.png"}
            alt="a image of my team create food"
            width={1916}
            height={945}
          />
        </Card>
      </div>
    </section>
  );
};

export default Hero;
