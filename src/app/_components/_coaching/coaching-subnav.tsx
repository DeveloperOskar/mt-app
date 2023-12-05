import React from "react";
import CoachingSubNavLink from "./coaching-subnav-link";

const CoachingSubNav = () => {
  return (
    <nav className="flex items-center  gap-6  border-b bg-white px-3 py-3">
      <CoachingSubNavLink
        part="data"
        href={"/coaching/data/foods"}
        text={"Livsmedel"}
      />
      <CoachingSubNavLink
        part="data"
        href={"/coaching/data/clients"}
        text={"Klienter"}
      />

      <CoachingSubNavLink
        part="tools"
        href={"/coaching/tools/meal-plan"}
        text={"Måltidsplaneraren"}
      />
    </nav>
  );
};

export default CoachingSubNav;
