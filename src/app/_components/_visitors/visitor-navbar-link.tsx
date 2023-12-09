"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/app/_lib/utils";

export const NavLink = ({ href, text }: { text: string; href: string }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={cn(
          "group relative text-base font-semibold underline-offset-2 hover:text-black hover:underline",
          href === pathname ? " text-black underline " : "text-black/70",
        )}
        href={href}
      >
        <span>{text}</span>
      </Link>
    </li>
  );
};
