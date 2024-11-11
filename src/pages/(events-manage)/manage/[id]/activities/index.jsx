import { useEvent } from '@/lib/layout'
import Page from './page'

export default function OrganizerActivitiesPage() {
  const eventData = useEvent()

  return <Page event={eventData} />
}
