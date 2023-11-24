"use client";
import React from "react";
import { Button } from "~/app/_components/ui/button";
import { signIn } from "next-auth/react";

const SignInGithub = () => {
  return (
    <Button onClick={() => signIn("github")} className="w-full">
      Logga in med Github
    </Button>
  );
};

export default SignInGithub;
