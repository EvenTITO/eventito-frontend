import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import Page from '@/pages/(events-manage)/events/[id]/view/calendar/page'

export default function EventViewCalendarPage() {
  const { data: eventInfo, isPending, error } = useGetEvent()

  const component = <Page event={eventInfo} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
