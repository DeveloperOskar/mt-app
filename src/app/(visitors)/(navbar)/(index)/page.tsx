import { Heart, Receipt, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";

export default async function Home() {
  return (
    <main className="container mx-auto flex h-[calc(100%-70px)] max-w-[2800px] items-center gap-12 pl-0 pr-0">
      <div className="ml-[8vw] shrink basis-[1000px] ">
        <h1 className="text-7xl font-bold">
          Ta din coaching till <br></br> nästa nivå
        </h1>
        <p className="max-w-[850px] pb-10 pt-6 text-lg text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          inventore saepe odit. Quo animi fugit dolor soluta, enim fugiat
          praesentium unde numquam amet. Odit soluta fugit, corrupti porro
          assumenda repudiandae.
        </p>

        <div className="flex items-center  gap-4">
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

        <div className="gap- mt-10 grid grid-cols-2 gap-x-6">
          <Card className=" relative border-white p-4 shadow-md">
            <p className="text-sm text-gray-700">Mer pengar</p>
            <h2 className=" mt-2 text-lg font-bold">Öka dina intäkter</h2>
            <p className="text-xs text-gray-700">
              I snitt 13.5% ökade intäkter
            </p>

            <Receipt className="absolute right-4 top-4 h-4 w-4 text-gray-500" />
          </Card>

          <Card className=" relative border-white p-4 shadow-md">
            <p className="text-sm text-gray-700">Hjälp mer</p>
            <h2 className=" mt-2 text-lg font-bold">Hjälp flera personer</h2>
            <p className="text-xs text-gray-700">6 personer flera</p>

            <Heart className="absolute right-4 top-4 h-4 w-4 fill-gray-500 text-gray-500" />
          </Card>
        </div>
      </div>

      <div className="flex h-full grow items-center">
        <Card className="h-[80%] border-[12px] border-white shadow-md">
          <Image
            className="h-full w-auto rounded object-cover object-left"
            src={"/hero-img.png"}
            alt="a image of my team create food"
            width={1916}
            height={945}
          />
        </Card>
      </div>
    </main>
  );
}
