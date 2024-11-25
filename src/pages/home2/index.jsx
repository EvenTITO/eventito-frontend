import FetchStatus from '@/components/FetchStatus'
import { getPublicEvents } from '@/services/api/events/general/hooks'
import Page from './page'

export default function HomePage() {
  const { isPending, error, data: events } = getPublicEvents()

  const component = <Page events={events} />
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  )
}
