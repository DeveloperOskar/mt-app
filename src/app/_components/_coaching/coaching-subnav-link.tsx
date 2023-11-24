"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "~/app/_lib/utils";

const CoachingSubNavLink = ({ href, text }: { href: string; text: string }) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        "group relative  hover:text-black",
        href === pathname ? " text-black" : "text-black/60",
      )}
      href={href}
    >
      <span>{text}</span>

      <div
        className={cn(
          "absolute left-0 top-[35px] h-[2px] w-full transition-all duration-100 group-hover:bg-black",
          href === pathname ? "bg-black" : "bg-transparent",
        )}
      ></div>
    </Link>
  );
};

export default CoachingSubNavLink;
