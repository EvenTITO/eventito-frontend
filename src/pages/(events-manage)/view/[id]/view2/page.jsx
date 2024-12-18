import Banner from './_components/Banner'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import MetadataList from './_components/MetadataList'
import TitleEvent from './_components/TitleEvent'
import { getDates } from '@/pages/(events-manage)/manage/[id]/administration/_components/utils'
import RegistrationCards from './_components/RegistrationCards'
import AboutEvent from './_components/AboutEvent'
import Prices from './_components/Prices'

export default function Page({ eventInfo }) {
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
          />

          <Prices prices={eventInfo.pricing} />
          <AboutEvent
            description={
              eventInfo.mdata?.description ||
              'Este evento no cuenta con una descripción por el momento.'
            }
          />
        </div>
      </ContainerPage>
    </div>
  )
}
