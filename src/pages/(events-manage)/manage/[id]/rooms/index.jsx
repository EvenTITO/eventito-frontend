import { useGetEvent } from '@/hooks/events/useEventState.js'
import FetchStatus from '@/components/FetchStatus.jsx'
import Page from '@/pages/(events-manage)/manage/[id]/rooms/page.jsx'

export default function RoomsConfigPage() {
  const eventData = useGetEvent()
  const component = (
    <Page event={eventData.data} rooms={eventData.data.mdata?.rooms || []} />
  )
  return (
    <FetchStatus
      component={component}
      isPending={eventData.isPending}
      error={eventData.error}
    />
  )
}
