import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { useEvent } from '@/lib/layout'
import { useGetWorkById } from '@/hooks/events/worksHooks'

export default function AssignmentPage() {
  const eventData = useEvent()
  const { isPending, error, data: selectedWork } = useGetWorkById()

  const component = (
    <Page selectedWork={selectedWork} reviewForm={eventData.review_skeleton} />
  )
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  )
}
