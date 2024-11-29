import EventCardWithFocus from '@/components/Card/EventCard'
import { Card } from '@/components/ui/card'
import { Avatar } from '@nextui-org/avatar'

export default function MyEventsList({ events }) {
  return (
    <Card className="space-y-1 p-1 bg-[#f7f7f8] border-0">
      <div className="p-2">
        <p> </p>
      </div>
      {events.map((event) => (
        <EventCard event={event} />
      ))}
    </Card>
  )
}

function EventCard({ event }) {
  const { id, title, shortDescription } = event
  const logoURL =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/230px-Python-logo-notext.svg.png'

  return (
    <EventCardWithFocus
      eventId={id}
      title={title}
      description={shortDescription}
      logoURL={logoURL ? <Avatar src={logoURL} /> : null}
    />
  )
}
