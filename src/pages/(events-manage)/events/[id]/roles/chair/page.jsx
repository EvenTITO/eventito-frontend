import React from 'react'
import { useNavigator } from '@/lib/navigation'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import TrackSelector from './_components/TrackSelector'
import Stats from './_components/Stats'
import Insights from './_components/Insights'
import Tables from './_components/Tables'

export default function Component({
  tracks,
  selectedTrack,
  setSelectedTrack,
  works,
}) {
  const navigator = useNavigator()

  const handleRowClick = (work) => {
    const path = `works/${work.id}`
    navigator.foward(path)
  }

  return (
    <ContainerPage>
      <TitlePage
        title={'Administración y envío de revisiones'}
        rightComponent={
          <TrackSelector
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        }
      />
      <div className="space-y-6 pt-6">
        <Stats works={works} />

        <Tables
          works={works}
          selectedTrack={selectedTrack}
          handleRowClick={handleRowClick}
        />

        <Insights works={works} />
      </div>
    </ContainerPage>
  )
}
