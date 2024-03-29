import "~/styles/globals.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import VisitorNavbar from "~/app/_components/_visitors/visitor-navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "~/app/_components/_visitors/footer";

export const metadata = {
  title: "MyTeam - Bästa platformen för coacher",
  description:
    "En platform för coacher att nå ut till sina kunder. Du kan enkelt skapa kost och träningsprogram och dela med dig till dina kunder.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <VisitorNavbar />
          {children}
          <Footer />
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
