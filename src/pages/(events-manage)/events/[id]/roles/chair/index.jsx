import { useEffect, useState } from 'react'
import { useGetMyChair, useGetWorksByTrack } from '@/hooks/events/chairHooks'
import Page from './page'
import FetchStatus from '@/components/FetchStatus.jsx'
import { ORGANIZER_ROLE } from '@/lib/Constants.js'
import { useGetEvent } from '@/hooks/events/useEventState'
import { useSelector } from 'react-redux'

export default function ChairPage() {
  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetEvent()

  const isOrganizer =
    eventData?.roles !== undefined
      ? eventData?.roles.includes(ORGANIZER_ROLE)
      : false
  const myChairData = isOrganizer
    ? {
        data: eventData,
        isLoading: isEventLoading,
        error: eventError,
      }
    : useGetMyChair()

  const tracksSettled = myChairData.data?.tracks
  const [selectedTrack, setSelectedTrack] = useState(
    tracksSettled ? tracksSettled[0] : ''
  )
  const {
    data: works,
    isPending: isPendingWorks,
    error: errorWorks,
  } = useGetWorksByTrack(selectedTrack)

  useEffect(() => {
    if (tracksSettled && tracksSettled.length > 0) {
      setSelectedTrack(tracksSettled[0])
    }
  }, [tracksSettled])

  const component = (
    <Page
      tracks={tracksSettled || []}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      works={works || []}
    />
  )

  return (
    <FetchStatus
      component={component}
      isPending={myChairData.isPending || isPendingWorks}
      error={myChairData.error || errorWorks}
    />
  )
}
