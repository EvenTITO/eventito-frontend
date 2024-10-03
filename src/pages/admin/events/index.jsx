import { useGetEventsWaitingApproval } from '@/hooks/admin/adminEventsHooks'
import Page from './page'
import FetchStatus from '@/components/FetchStatus'

export default function AdminEventsPage() {
  const { data: events, isPending, error } = useGetEventsWaitingApproval()

  if (events) {
    console.log(events)
  }

  const component = <Page events={events || []} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
