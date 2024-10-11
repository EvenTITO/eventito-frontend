import Page from '@/pages/(events-manage)/events/[id]/view/calendar/page'
import { useGetWorksWithTalk } from '@/hooks/events/worksHooks.js'
import FetchStatus from '@/components/FetchStatus.jsx'
import { useEvent } from '@/lib/layout'

export default function EventViewCalendarPage() {
  const eventData = useEvent()
  const { data: worksInfo, isPending, error } = useGetWorksWithTalk()

  const component = <Page event={eventData} works={worksInfo || []} />
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  )
}
