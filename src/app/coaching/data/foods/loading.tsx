import LoadingSkeleton from "~/app/_components/_coaching/data/foods/loading-skeleton";
import SingleScreenWrapper from "~/app/_components/_coaching/single-screen-wrapper";

export default function Loading() {
  return (
    <SingleScreenWrapper>
      <LoadingSkeleton />
    </SingleScreenWrapper>
  );
}
