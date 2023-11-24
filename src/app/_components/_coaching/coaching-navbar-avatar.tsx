import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CoachingNavbarAvatar = () => {
  return (
    <Avatar>
      <AvatarImage src="lfsdjfskl" />
      <AvatarFallback className="bg-black text-white">CN</AvatarFallback>
    </Avatar>
  );
};

export default CoachingNavbarAvatar;
