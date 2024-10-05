import Page from '@/pages/(events-manage)/events/[id]/view/calendar/page'
import { useGetEvent } from '@/hooks/events/useEventState.js'
import { useGetWorksWithTalk } from '@/hooks/events/worksHooks.js'
import FetchStatus from '@/components/FetchStatus.jsx'

export default function EventViewCalendarPage() {
  const { data: eventInfo } = useGetEvent()
  const { data: worksInfo, isPending, error } = useGetWorksWithTalk()

  const pageComponent = <Page event={eventInfo} works={worksInfo || []} />
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  )
}
