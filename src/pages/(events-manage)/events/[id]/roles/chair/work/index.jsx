import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { useGetWorkById, useGetWorkInfo } from '@/hooks/events/worksHooks'

export default function ChairWorkPage() {
  const { workInfo, reviews, reviewers, isPending, error } = useGetWorkInfo()
  const reviewsWithSubmissionNumber = getReviewsData(workInfo, reviews)
  const reviewersWithStatus = getReviewersData(workInfo, reviews, reviewers)

  const component = (
    <Page
      selectedWork={workInfo}
      reviews={reviewsWithSubmissionNumber}
      reviewers={reviewersWithStatus}
    />
  )
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}

const getReviewsData = (work, reviews) => {
  if (work === undefined || reviews === undefined) {
    return
  }
  const sortedSubmissions = work.submissions.toSorted(
    (a, b) => a.creation_date - b.creation_date
  )
  return reviews.map((r) => {
    return {
      ...r,
      submissionNumber: sortedSubmissions.findIndex(
        (s) => s.id === r.submissionId
      ),
    }
  })
}

const getReviewersData = (work, reviews, reviewers) => {
  if (work === undefined || reviews === undefined || reviewers === undefined) {
    return
  }
  const lastSubmissionId = work.lastSubmission
    ? work.lastSubmission.id
    : undefined
  return reviewers.map((reviewer) => {
    return {
      ...reviewer,
      reviewAlreadySubmitted: reviews.some(
        (r) =>
          r.submissionId === lastSubmissionId && r.reviewerId === reviewer.id
      ),
    }
  })
}
