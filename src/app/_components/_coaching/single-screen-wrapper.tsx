import React from "react";
import { cn } from "~/app/_lib/utils";

const SingleScreenWrapper: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ children, className = "" }) => {
  return (
    <main className={cn("h-[calc(100vh-115px)] p-4 ", className)}>
      {children}
    </main>
  );
};

export default SingleScreenWrapper;
