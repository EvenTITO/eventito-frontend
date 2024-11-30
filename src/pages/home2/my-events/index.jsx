import Page from './page'
import { getMyEvents } from '@/services/api/events/general/hooks'

export default function MyEventsPage() {
  const myEvents = getMyEvents()

  return <Page events={myEvents.data} isPending={myEvents.isPending} />
}
