import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { useGetEvent } from '@/hooks/events/useEventState'

export default function PricingConfigPage() {
  const eventData = useGetEvent()

  const component = (
    <Page
      prices={eventData.data?.pricing || []}
      dates={eventData.data?.dates}
    />
  )
  return (
    <FetchStatus
      component={component}
      isPending={eventData.isPending}
      error={eventData.error}
    />
  )
}
