import Page from './page'
import { useEvent } from '@/lib/layout'

export default function InfoConfigPage() {
  const eventData = useEvent()

  return <Page eventInfo={eventData} />
}
