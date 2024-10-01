import Page from './page'
import FetchStatus from '@/components/FetchStatus'
import { useGetMyWorks } from '@/hooks/events/authorHooks'
import { useGetEvent } from '@/hooks/events/useEventState.js'
import { SPEAKER_ROLE } from '@/lib/Constants'

export default function NewPaymentPage() {
  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetEvent()

  const isSpeaker = eventData?.roles?.includes(SPEAKER_ROLE)

  const {
    data: worksData,
    isLoading: isWorksLoading,
    error: worksError,
  } = useGetMyWorks({
    enabled: !!isSpeaker,
  })

  const component = <Page eventData={eventData || {}} works={worksData || {}} />

  return (
    <FetchStatus
      component={component}
      isPending={isEventLoading || isWorksLoading}
      error={eventError || worksError}
    />
  )
}
