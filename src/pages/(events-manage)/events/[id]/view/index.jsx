import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import Page from '@/pages/(events-manage)/view/[id]/page'

export default function EventViewPage() {
  const { data: eventInfo, isPending, error } = useGetEvent()

  const component = <Page event={eventInfo} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
