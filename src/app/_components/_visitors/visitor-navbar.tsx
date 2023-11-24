import React from "react";
import Image from "next/image";
import { NavLink } from "./visitor-navbar-link";
import VisitorsSignInLinks from "./visitors-signin-links";
import { getServerAuthSession } from "~/server/auth";

const VisitorNavbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between gap-6 border-b bg-white px-3 py-3">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Image
            src={"/mt-nav-logo-xxs.png"}
            alt="my team logo"
            width={40}
            height={40}
            className="height-[40px] w-[40px] "
          />

          <span className="text-xl font-semibold">MyTeam</span>
        </div>

        <ul className="flex items-center gap-4">
          <NavLink text="Hem" href="/" />
          <NavLink text="Funktioner" href="/functions" />
          <NavLink text="Priser" href="/pricing" />
        </ul>
      </div>

      <VisitorsSignInLinks isLoggedIn={session !== null} />
    </nav>
  );
};

export default VisitorNavbar;
