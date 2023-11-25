"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CoachingNavbarAvatar = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback className="bg-black font-semibold text-white">
        {name}
      </AvatarFallback>
    </Avatar>
  );
};

export default CoachingNavbarAvatar;
