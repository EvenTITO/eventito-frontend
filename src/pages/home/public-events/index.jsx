import Page from './page'
import { getPublicEvents } from '@/services/api/events/general/hooks'

export default function PublicEventsPage() {
  const events = getPublicEvents()

  return <Page events={events.data} isPending={events.isPending} />
}
