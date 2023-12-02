import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import VisitorSignOutBtn from "./visitor-sign-out-btn";

export const VisitorsSignInLinks = ({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) => {
  if (!isLoggedIn)
    return (
      <div className="flex items-center gap-4">
        <Link href={"/sign-up"}>
          <Button variant={"secondary"}>Gå med</Button>
        </Link>

        <Link href={"/sign-in"} data-testid="sign-in-btn">
          <Button variant={"default"}>Logga in</Button>
        </Link>
      </div>
    );
  else
    return (
      <div className="flex items-center gap-4">
        <VisitorSignOutBtn />

        <Link href="/coaching/data/foods" data-testid="application-btn">
          <Button variant={"default"}>Gå till applikationen</Button>
        </Link>
      </div>
    );
};

export default VisitorsSignInLinks;
