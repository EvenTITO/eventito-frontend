import { CardBody } from '@nextui-org/card'
import CardContainer from './CardContainer'
import Icon from '@/components/Icon'

export default function CreateEventCard({ navigateTo }) {
  return (
    <CardContainer onPress={() => alert('creando evento')}>
      <div className="flex flex-col flex-grow p-6 w-full">
        <CardBody className="flex-grow items-center justify-center gap-2">
          <Icon name="Plus" />
          <p>Crear nuevo evento</p>
        </CardBody>
      </div>
    </CardContainer>
  )
}
