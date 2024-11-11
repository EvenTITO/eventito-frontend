import { useEvent } from '@/lib/layout'
import Page from './Page'

export default function OrganizerActivitiesPage() {
  const eventData = useEvent()

  return <Page event={eventData} />
}
