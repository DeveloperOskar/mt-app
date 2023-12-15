"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "~/app/_lib/utils";

const CoachingSubNavLink = ({
  href,
  text,
  part,
}: {
  part: string;
  href: string;
  text: string;
}) => {
  const pathname = usePathname();

  if (!pathname.includes(part)) return null;

  return (
    <Link
      className={cn(
        "group relative  font-semibold underline-offset-2 hover:text-black  hover:underline",
        href === pathname ? " text-black underline" : "text-black/60",
      )}
      href={href}
    >
      <span>{text}</span>

      {/* <div
        className={cn(
          "absolute left-0 top-[35px] h-[2px] w-full transition-all duration-100 group-hover:bg-black",
          href === pathname ? "bg-black" : "bg-transparent",
        )}
      ></div> */}
    </Link>
  );
};

export default CoachingSubNavLink;
