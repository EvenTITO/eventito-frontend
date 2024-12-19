import AboutEvent from './_components/AboutEvent'
import Banner from './_components/Banner'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import MetadataList from './_components/MetadataList'
import Prices from './_components/Prices'
import RegistrationCards from './_components/RegistrationCards'
import TitleEvent from './_components/TitleEvent'
import { getDates } from '@/pages/(events-manage)/manage/[id]/administration/_components/utils'
import { useState } from 'react'
import Loader from '@/components/Loader'

export default function Page({ eventInfo, activeRegistration = false }) {
  if (!eventInfo) return null

  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <Loader showMessage={true} />
  }

  const [startDate, _, submissionLimit] = getDates(eventInfo)

  return (
    <div className="space-y-6">
      <Banner title={eventInfo.title} bannerURL={eventInfo.bannerURL} />
      <ContainerPage>
        <div className="space-y-10">
          <TitleEvent eventInfo={eventInfo} />
          <MetadataList
            location={eventInfo.location}
            contact={eventInfo.contact}
            organizedBy={eventInfo.organized_by}
          />

          <RegistrationCards
            startDate={startDate}
            submissionLimit={submissionLimit}
            eventTitle={eventInfo.title}
            eventId={eventInfo.id}
            activeRegistration={activeRegistration}
            setIsLoading={setIsLoading}
          />

          <div className="space-y-14">
            <Prices prices={eventInfo.pricing} dates={eventInfo.dates} />
            <AboutEvent
              description={
                eventInfo.mdata?.description ||
                'Este evento no cuenta con una descripción por el momento.'
              }
            />
          </div>
        </div>
      </ContainerPage>
    </div>
  )
}
