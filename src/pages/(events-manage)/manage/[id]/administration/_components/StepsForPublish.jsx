import { STARTED_STATUS } from '@/lib/Constants'
import SubtitleStyle from './SubtitleStyle'
import CardWithFocus from '@/components/Card/CardWithFocus'
import { useNavigator } from '@/lib/navigation'

export default function StepsForPublish({ eventInfo }) {
  // if (eventInfo.status === STARTED_STATUS) return null

  const navigator = useNavigator()
  function navigate(to) {
    navigator.replace('administration', to)
  }

  return (
    <div className="space-y-6">
      <SubtitleStyle>Pasos para publicar el evento</SubtitleStyle>
      <CardWithFocus
        nameIcon="CalendarIcon"
        onClick={() => navigate('activities')}
      >
        Definir fecha de comienzo y de fin del evento
      </CardWithFocus>
      <CardWithFocus
        nameIcon="CalendarIcon"
        onClick={() => navigate('activities')}
      >
        Definir fecha límite de recepción de trabajos
      </CardWithFocus>
      <CardWithFocus nameIcon="Image" onClick={() => navigate('info')}>
        Elegir un banner y un logo
      </CardWithFocus>
    </div>
  )
}
