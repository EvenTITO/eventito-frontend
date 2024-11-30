import { getMyEvents } from '@/services/api/events/general/hooks'
import Page from './page'

export default function MyEventsPage() {
  const myEvents = getMyEvents()

  return <Page events={myEvents.data} isPending={myEvents.isPending} />
}
