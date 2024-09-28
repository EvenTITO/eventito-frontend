import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewersForWork, useGetReviewsForWork} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
  const workInfo = useGetWorkById();
  const reviews = useGetReviewsForWork();
  const reviewers = useGetReviewersForWork();
  const reviewsWithSubmissionNumber = getReviewsData(workInfo.data, reviews.data);
  const reviewersWithStatus = getReviewersData(workInfo.data, reviews.data, reviewers.data);
  
  const component = (
    <Page selectedWork={workInfo.data} reviews={reviewsWithSubmissionNumber} reviewers={reviewersWithStatus}/>
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
  return reviews.map((r) => {
    return {
      ...r,
      submissionNumber: sortedSubmissions.findIndex((s) => s.id === r.submissionId)
    }
  });
}

const getReviewersData = (work, reviews, reviewers) => {
  if (work === undefined || reviews === undefined || reviewers === undefined) {
    return;
  }
  const lastSubmissionId = work.lastSubmission ? work.lastSubmission.id : undefined;
  return reviewers.map(reviewer => {
    return {
      ...reviewer,
      reviewAlreadySubmitted: reviews.some((r) => r.submissionId === lastSubmissionId && r.reviewerId === reviewer.id)
    }
  });
}
