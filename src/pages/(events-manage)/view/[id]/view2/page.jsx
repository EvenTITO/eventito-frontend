import Banner from './_components/Banner'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import MetadataList from './_components/MetadataList'
import TitleEvent from './_components/TitleEvent'
import RegistrationCard from './_components/RegistrationCards'
import { getDates } from '@/pages/(events-manage)/manage/[id]/administration/_components/utils'

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

          <div>
            <RegistrationCard
              open={{
                title: 'Inscripciones abiertas para asistir al evento',
                description: 'Haz click para ir al formulario de inscripción',
              }}
              close={{
                title: 'Inscripciones cerradas para asistir al evento',
              }}
              isOpen={new Date() < startDate}
              limitDate={startDate}
            />
            <RegistrationCard
              open={{
                title: 'Perído de presentación de trabajos abierto',
                description: 'Haz click para ir al formulario de inscripción',
              }}
              close={{
                title: 'Período de presentación de trabajos cerrado',
              }}
              limitDate={submissionLimit}
              isOpen={new Date() < submissionLimit}
            />
          </div>
        </div>
      </ContainerPage>
    </div>
  )
}
