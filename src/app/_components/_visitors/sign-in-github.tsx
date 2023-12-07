"use client";
import React from "react";
import { Button } from "~/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

const SignInGithub: React.FC<{ isSignIn: boolean }> = ({ isSignIn }) => {
  return (
    <Button
      onClick={() => signIn("github")}
      className="flex w-full items-center gap-2"
    >
      <Github className="text-white" />
      <span>{isSignIn ? "Logga in" : "Registrera dig"} med Github</span>
    </Button>
  );
};

export default SignInGithub;
