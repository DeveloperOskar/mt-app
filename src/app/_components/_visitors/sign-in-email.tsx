"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

const SignInEmail = () => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">E-post</Label>
      <Input type="email" id="email" placeholder="MyTeam@gmail.com..." />
      <Button onClick={() => signIn("email", {})} className="mt-3">
        Logga in
      </Button>
    </div>
  );
};

export default SignInEmail;
