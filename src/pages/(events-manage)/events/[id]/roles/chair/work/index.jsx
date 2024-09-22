import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {
  useGetReviewsForAssignment,
} from "@/hooks/events/chairHooks";
import { useGetWorkForAssignment } from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
  // TODO: cambiar esto para que sea global?
  const assignmentInfo = useGetWorkForAssignment();
  const reviews = useGetReviewsForAssignment();

  const component = (
    <Page selectedAssignment={assignmentInfo.data} reviews={reviews.data} />
  );
  return (
    <FetchStatus
      component={component}
      isPending={assignmentInfo.isPending || reviews.isPending}
      error={assignmentInfo.error || reviews.error}
    />
  );
}
