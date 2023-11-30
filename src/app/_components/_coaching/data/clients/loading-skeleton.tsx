import React from "react";
import { Skeleton } from "~/app/_components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <main className="flex h-[calc(100vh-125px)] flex-col p-4">
      <div className="flex shrink items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-[34px] w-[260px]" />

          <Skeleton className="h-[34px] w-[140px]" />
        </div>

        <Skeleton className="h-[34px] w-[120px]" />
      </div>
      <div className="styled-scrollbar grow ">
        <Skeleton className="h-[96%] w-full grow rounded-md" />
      </div>

      <div className="flex shrink items-center justify-end gap-4 py-4">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[30px] w-[100px]" />
      </div>
    </main>
  );
};

export default LoadingSkeleton;
