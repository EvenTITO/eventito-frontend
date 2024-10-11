import Page from './page'
import { useEvent } from '@/lib/layout'

export default function PricingConfigPage() {
  const eventData = useEvent()

  return <Page prices={eventData?.pricing || []} dates={eventData?.dates} />
}
