import { Image } from '@nextui-org/image'
import CardContainer from './CardContainer'
import { CardBody } from '@nextui-org/card'
import { useNavigator } from '@/lib/navigation'
import { MANAGE_EVENT_URL, VIEW_EVENT_URL } from '../../_components/constants'
import { Badge } from '@/components/ui/badge'
import {
  CREATED_STATUS,
  EVENT_STATUS_LABELS,
  STARTED_STATUS,
} from '@/lib/Constants'
import ImageWrapper from '@/components/ImageWrapper'

export default function EventCard({ event, showStatus = false }) {
  const navigator = useNavigator()

  function navigateToEvent() {
    if (event.status === STARTED_STATUS) {
      navigator.to(VIEW_EVENT_URL + event.id)
    } else if (event.status === CREATED_STATUS) {
      navigator.to(MANAGE_EVENT_URL + event.id)
    }
  }

  return (
    <CardContainer onPress={navigateToEvent}>
      <div className="h-[100px] w-full overflow-hidden">
        <ImageWrapper
          src={event.bannerURL}
          title={event.title}
          height="100px"
          width="100%"
        />
      </div>
      {showStatus ? (
        <Badge className="absolute top-2 right-2 z-10 bg-gray-50 text-black">
          {EVENT_STATUS_LABELS[event.status]}
        </Badge>
      ) : null}
      <div className="flex flex-col flex-grow p-6">
        <CardBody className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        </CardBody>
      </div>
    </CardContainer>
  )
}
