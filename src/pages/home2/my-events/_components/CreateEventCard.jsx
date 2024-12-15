import CardContainer from './CardContainer'
import Icon from '@/components/Icon'
import { CardBody } from '@nextui-org/card'
import { NewEventWrapper } from '../../new-event/NewEvent'

export default function CreateEventCard() {
  function trigger(onOpen) {
    return (
      <CardContainer onPress={onOpen}>
        <div className="flex flex-col flex-grow p-6 w-full">
          <CardBody className="flex-grow items-center justify-center gap-2">
            <Icon name="Plus" />
            <p>Crear nuevo evento</p>
          </CardBody>
        </div>
      </CardContainer>
    )
  }

  return <NewEventWrapper trigger={trigger} />
}
