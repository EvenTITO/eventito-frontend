import { Image } from '@nextui-org/image'
import CardContainer from './CardContainer'
import { CardBody } from '@nextui-org/card'
import { useNavigator } from '@/lib/navigation'
import { VIEW_EVENT_URL } from '../../_components/constants'

export default function EventCard({ event }) {
  const navigator = useNavigator()

  return (
    <CardContainer onPress={() => navigator.to(VIEW_EVENT_URL + event.id)}>
      <Image
        isZoomed
        shadow="sm"
        radius={null}
        width="100%"
        alt={event.title}
        className="w-full object-cover h-[100px]"
        src={event.bannerURL}
      />
      <div className="flex flex-col flex-grow p-6">
        <CardBody className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
        </CardBody>
      </div>
    </CardContainer>
  )
}