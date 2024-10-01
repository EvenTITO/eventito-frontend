import ContainerViewPage from '../_components/ContainerViewPage'
import ImageHeader from '../_components/ImageHeader'
import {
  MotionMain,
  MotionDiv,
  MotionH1,
  MotionP,
} from '../_components/Animation'
import Prices from './_components/Prices'
import RegistrationForm from './_components/RegistrationForm'

export default function RegistrationPage({ event }) {
  return (
    <ContainerViewPage>
      <ImageHeader
        image={event.media.find((item) => item.name === 'banner_image')}
      />
      <MotionMain>
        <MotionDiv className="space-y-6 mb-12">
          <MotionH1 className="text-4xl font-bold">
            Inscripción para {event.title}
          </MotionH1>
          <MotionP className="text-lg text-muted-foreground">
            Completar todos los campos para finalizar la inscripción.
          </MotionP>
        </MotionDiv>

        <Prices event={event} />
        <RegistrationForm event={event} />
      </MotionMain>
    </ContainerViewPage>
  )
}
