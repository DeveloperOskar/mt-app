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
          "group relative font-semibold hover:text-black",
          href === pathname ? " text-black" : "text-black/60",
        )}
        href={href}
      >
        <span>{text}</span>
        <div
          className={cn(
            "absolute left-0 top-[42px] h-[2px] w-full transition-all duration-100 group-hover:bg-black",
            href === pathname ? "bg-black" : "bg-transparent",
          )}
        ></div>
      </Link>
    </li>
  );
};
