import "~/styles/globals.css";

import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import CoachingNavbar from "../_components/_coaching/coaching-navbar";
import CoachingSubNav from "../_components/_coaching/coaching-subnav";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-slate-50">
        <CoachingNavbar />
        <CoachingSubNav />

        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
