import {
  getMyEvents,
  getPublicEvents,
} from '@/services/api/events/general/hooks'
import Page from './page'

export default function HomePage() {
  const events = getPublicEvents()
  const myEvents = getMyEvents()

  return <Page events={events} myEvents={myEvents} />
}
