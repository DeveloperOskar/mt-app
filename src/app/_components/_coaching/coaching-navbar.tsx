import React, { Suspense } from "react";
import Image from "next/image";
import { CoachingNavLink } from "./coaching-navbar-link";
import { getInitials } from "~/app/_lib/utils";
import { getServerAuthSession } from "~/server/auth";
import CoachingNavbarAvatar from "./coaching-navbar-avatar";

const CoachingNavbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between gap-6  bg-white px-3 py-3">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Image
            src={"/mt-nav-logo-xxs.png"}
            alt="my team logo"
            width={40}
            height={40}
            className="height-[40px] w-[40px] "
          />

          <span className="text-xl font-semibold">
            MyTeam <span className="text-gray-600">/</span>
          </span>
        </div>

        <ul className="flex items-center gap-4">
          <CoachingNavLink
            text="Data"
            href="/coaching/data/foods"
            matcher={"data"}
          />
          <CoachingNavLink
            text="Verktyg"
            href="/coaching/tools/meal-plan"
            matcher={"tools"}
          />
        </ul>
      </div>

      <CoachingNavbarAvatar
        image={session?.user?.image ?? ""}
        name={getInitials(session?.user?.name ?? "")}
      />
    </nav>
  );
};

export default CoachingNavbar;
