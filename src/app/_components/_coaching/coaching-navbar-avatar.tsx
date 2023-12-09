"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const CoachingNavbarAvatar = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer border-2">
          <AvatarImage className="h-full w-full object-cover" src={image} />
          <AvatarFallback className="bg-black font-semibold text-white">
            {name}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 min-w-[200px]">
        <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={"/"} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Lämna applikationen</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logga ut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CoachingNavbarAvatar;
