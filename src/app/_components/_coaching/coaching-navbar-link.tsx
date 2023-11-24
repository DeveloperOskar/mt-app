"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/app/_lib/utils";

export const CoachingNavLink = ({
  href,
  text,
  matcher,
}: {
  text: string;
  href: string;
  matcher: string;
}) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        className={cn(
          "group relative font-semibold hover:text-black",
          pathname.includes(matcher) ? " text-black" : "text-black/60",
        )}
        href={href}
      >
        <span>{text}</span>
      </Link>
    </li>
  );
};
