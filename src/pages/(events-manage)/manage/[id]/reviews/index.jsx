import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import Page from './page'

export default function ReviewsConfigPage() {
  const { data: eventData, isPending, error } = useGetEvent()

  const component = <Page reviewSkeleton={eventData.review_skeleton || {}} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
