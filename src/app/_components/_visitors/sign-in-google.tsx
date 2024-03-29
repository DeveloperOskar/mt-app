"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignInGoogle: React.FC<{ isSignIn: boolean }> = ({ isSignIn }) => {
  return (
    <Button
      data-testid="sign-in-google-btn"
      variant={"outline"}
      onClick={() => signIn("google")}
      className="flex w-full items-center gap-2"
    >
      <Image
        src={"/google-icon-img-min.png"}
        alt="google logo"
        width={25}
        height={25}
      />
      {isSignIn ? "Logga in" : "Registrera dig"} med Google
    </Button>
  );
};

export default SignInGoogle;
