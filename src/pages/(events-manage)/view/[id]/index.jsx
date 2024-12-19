import { useGetEvent } from '@/hooks/events/useEventState'
import FetchStatus from '@/components/FetchStatus'
import Page from './page'

export default function EventViewPage() {
  const { data: event, isPending, error } = useGetEvent()

  const component = <Page eventInfo={event} />

  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
