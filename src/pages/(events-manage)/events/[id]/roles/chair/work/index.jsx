import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { useGetWorkInfo } from '@/hooks/events/worksHooks'
import { getReviewersData, getReviewsData } from './_components/utils'

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
