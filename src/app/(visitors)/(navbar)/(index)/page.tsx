import Hero from "~/app/_components/_visitors/hero";
import Pricing from "~/app/_components/_visitors/pricing";
import SellingPoints from "~/app/_components/_visitors/selling-points";

export default async function Home() {
  return (
    <main className=" bg-white">
      <Hero />

      <SellingPoints />

      <Pricing />
    </main>
  );
}
