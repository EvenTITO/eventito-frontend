import { useGetEvent } from '@/hooks/events/useEventState'
import Page from './page'
import { useGetWorksByTrack } from '@/hooks/events/chairHooks'
import { useState } from 'react'

export default function ChairPage() {
  const { data: eventData } = useGetEvent()
  const [selectedTrack, setSelectedTrack] = useState(eventData?.tracks[0] || '')

  const { data: works, isPending, error } = useGetWorksByTrack(selectedTrack)

  return (
    <Page
      tracks={eventData?.tracks || []}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      works={works || []}
    />
  )
}
