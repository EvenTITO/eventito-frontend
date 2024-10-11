import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import { SPEAKER_ROLE } from '@/lib/Constants'
import { useEvent } from '@/lib/layout'
import { useGetMyWorks } from '@/hooks/events/authorHooks'

export default function NewPaymentPage() {
  const eventData = useEvent()
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
      isPending={isWorksLoading}
      error={worksError}
    />
  )
}
