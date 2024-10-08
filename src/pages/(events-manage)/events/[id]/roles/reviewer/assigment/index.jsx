import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { useGetWorkById } from '@/hooks/events/worksHooks'
import { useGetEvent } from '@/hooks/events/useEventState.js'

export default function AssignmentPage() {
  const { isPending, error, data: selectedWork } = useGetWorkById()
  const { data: eventData } = useGetEvent()

  const pageComponent = (
    <Page selectedWork={selectedWork} reviewForm={eventData.review_skeleton} />
  )
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  )
}
