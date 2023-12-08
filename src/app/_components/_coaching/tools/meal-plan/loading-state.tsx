import React from "react";
import SingleScreenWrapper from "../../single-screen-wrapper";
import { Card } from "~/app/_components/ui/card";
import ActionBar from "./action-bar";
import { Skeleton } from "~/app/_components/ui/skeleton";

const LoadingState = () => {
  return (
    <SingleScreenWrapper className="flex justify-between p-0">
      <Card className=" flex h-full basis-[330px] flex-col gap-6 rounded-none border-t-0 py-6">
        <div className="flex flex-col gap-4 px-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>

        <div className="styled-scrollbar flex flex-col gap-3 overflow-auto px-4">
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
        </div>
      </Card>

      <div className="flex basis-[700px] flex-col border-t-0 ">
        <ActionBar />
        <Card className="styled-scrollbar  flex h-full flex-col gap-6 overflow-auto rounded-none border-t-0 py-6">
          <Skeleton className="h-[80px] w-full" />
        </Card>
      </div>

      <Card className="flex h-full basis-[280px] flex-col gap-6 rounded-none border-t-0 py-4 ">
        <div className="flex flex-col gap-3  px-4">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>

        <div className="flex flex-col gap-3  px-4">
          <Skeleton className="h-[22px] w-full" />
        </div>

        <div className="flex flex-col gap-3  px-4">
          <Skeleton className="h-[40px] w-full" />
        </div>

        <div className="flex flex-col gap-3  px-4">
          <Skeleton className="h-[40px] w-[70px]" />
        </div>

        <div className="flex flex-col gap-3  ">
          <Skeleton className="h-[50px] w-full rounded-none" />
          <Skeleton className="h-[50px] w-full rounded-none" />
          <Skeleton className="h-[50px] w-full rounded-none" />
        </div>
      </Card>
    </SingleScreenWrapper>
  );
};

export default LoadingState;
