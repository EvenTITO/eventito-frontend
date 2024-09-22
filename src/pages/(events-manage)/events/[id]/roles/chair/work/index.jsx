import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {
  useGetReviewsForAssignment,
} from "@/hooks/events/chairHooks";
import { useGetWorkById } from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
  // TODO: cambiar esto para que sea global?
  const workInfo = useGetWorkById();
  const reviews = useGetReviewsForAssignment();

  const component = (
    <Page selectedWork={workInfo.data} reviews={reviews.data} />
  );
  return (
    <FetchStatus
      component={component}
      isPending={workInfo.isPending || reviews.isPending}
      error={workInfo.error || reviews.error}
    />
  );
}
