import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewsForWork, useGetReviewersForWork, getReviewersWithStatus} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
  const workInfo = useGetWorkById();
  const reviews = useGetReviewsForWork();
  const reviewers = useGetReviewersForWork();
  const reviewersWithStatus = getReviewersWithStatus(reviews, reviewers);
  const reviewsWithSubmissionNumber = getReviewsData(workInfo.data, reviews.data);

  const component = (
    <Page selectedWork={workInfo.data} reviews={reviewsWithSubmissionNumber} reviewersWithStatus={reviewersWithStatus.data}/>
  );
  return (
    <FetchStatus
      component={component}
      isPending={workInfo.isPending || reviews.isPending || reviewers.isPending}
      error={workInfo.error || reviews.error || reviewers.error}
    />
  );
}

const getReviewsData = (work, reviews) => {
  if (work === undefined || reviews === undefined) {
    return;
  }
  const sortedSubmissions = work.submissions.toSorted((a, b) => a.creation_date - b.creation_date)
  const reviewsWithSubmissionNumber = reviews.map((r) => {
    return {
      ...r,
      submissionNumber: sortedSubmissions.findIndex((s) => s.id === r.submissionId)
    }
  });
  return reviewsWithSubmissionNumber;
}
