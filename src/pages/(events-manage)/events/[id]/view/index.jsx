import Page from '@/pages/(events-manage)/view/[id]/page'
import { useEvent } from '@/lib/layout'

export default function EventViewPage() {
  const eventData = useEvent()

  return <Page eventInfo={eventData} />
}
