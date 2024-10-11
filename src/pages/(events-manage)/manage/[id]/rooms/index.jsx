import Page from '@/pages/(events-manage)/manage/[id]/rooms/page.jsx'
import { useEvent } from '@/lib/layout'

export default function RoomsConfigPage() {
  const eventData = useEvent()
  return <Page event={eventData} rooms={eventData.mdata?.rooms || []} />
}
