import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import SignInGithub from "~/app/_components/_visitors/sign-in-github";
import { redirect } from "next/navigation";
import SignInGoogle from "~/app/_components/_visitors/sign-in-google";
import { Button } from "~/app/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "~/app/_components/ui/separator";
import SignInEmail from "~/app/_components/_visitors/sign-in-email";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) {
    throw redirect("/coaching/data/foods");
  }

  return (
    <main className="container mx-auto flex h-full ">
      <section className="flex grow items-center">
        <div className="flex w-[400px] flex-col gap-8  rounded-md bg-white p-6 shadow-md">
          <div>
            <h1 className="text-2xl font-semibold">Logga in</h1>
            <p>
              Har du inget konto?{" "}
              <Link className="text-blue-500 hover:underline" href={"/sign-up"}>
                Registrera dig
              </Link>
            </p>
          </div>

          {/*TODO IMPLEMENT MAGIC LINK*/}

          {/* <SignInEmail /> */}

          {/* <div className="flex items-center gap-3">
            <Separator className="w-auto grow" />
            <p className="shrink text-sm text-gray-500">Eller med</p>
            <Separator className="w-auto grow" />
          </div> */}

          <div className="flex flex-col gap-4">
            <SignInGoogle isSignIn={true} />
            <SignInGithub isSignIn={true} />
          </div>

          <Link href={"/"}>
            <Button
              className="flex w-full items-center gap-1"
              variant={"secondary"}
            >
              <ArrowLeft className="h-5 w-5" />
              Tillbaka
            </Button>
          </Link>
        </div>
      </section>

      <section className="flex h-full shrink basis-[500px] flex-col ">
        <div className="grow border-l"></div>
        <div className="flex shrink basis-28 items-center">
          <div className="flex items-center gap-2">
            <Image
              src={"/mt-nav-logo-xxs.png"}
              alt="my team logo"
              width={40}
              height={40}
              className="height-[40px] ml-[-20px] w-[40px]"
            />
            <span className="text-2xl font-semibold">MyTeam</span>
          </div>
        </div>
        <div className="grow border-l"></div>
      </section>
    </main>
  );
}
