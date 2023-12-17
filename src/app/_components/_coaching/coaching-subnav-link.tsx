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
    </Link>
  );
};

export default CoachingSubNavLink;
