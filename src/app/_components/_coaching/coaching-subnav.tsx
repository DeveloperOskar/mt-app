import React from "react";
import CoachingSubNavLink from "./coaching-subnav-link";

const CoachingSubNav = () => {
  return (
    <nav className="flex items-center  gap-6  border-b bg-white px-3 py-3">
      <CoachingSubNavLink href={"/coaching/data/foods"} text={"Livsmedel"} />
      <CoachingSubNavLink href={"/coaching/data/clients"} text={"Klienter"} />
    </nav>
  );
};

export default CoachingSubNav;
