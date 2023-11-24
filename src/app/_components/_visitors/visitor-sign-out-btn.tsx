"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function VisitorSignOutBtn() {
  return (
    <Button variant={"secondary"} onClick={() => signOut()}>
      Logga ut
    </Button>
  );
}

export default VisitorSignOutBtn;
