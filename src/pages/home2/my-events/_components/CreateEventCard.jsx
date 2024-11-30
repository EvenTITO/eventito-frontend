import CardContainer from './CardContainer'
import Icon from '@/components/Icon'
import { CardBody } from '@nextui-org/card'
import { useNavigator } from '@/lib/navigation'
import { NEW_EVENT_URL } from '../../_components/constants'

export default function CreateEventCard() {
  const navigator = useNavigator()

  return (
    <CardContainer onPress={() => navigator.to(NEW_EVENT_URL)}>
      <div className="flex flex-col flex-grow p-6 w-full">
        <CardBody className="flex-grow items-center justify-center gap-2">
          <Icon name="Plus" />
          <p>Crear nuevo evento</p>
        </CardBody>
      </div>
    </CardContainer>
  )
}
