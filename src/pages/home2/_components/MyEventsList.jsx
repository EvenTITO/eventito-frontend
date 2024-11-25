import CardWithFocus from '@/components/Card/CardWithFocus'
import { Card } from '@/components/ui/card'
import { Avatar } from '@nextui-org/avatar'

export default function MyEventsList({ events }) {
  const events2 = [
    {
      title: 'Annual Computer Science Symposium',
      shortDescription:
        'A gathering of leading researchers in AI and machine learning.',
      logoURL:
        'https://img.freepik.com/vector-gratis/diseno-logotipo-cultura-dibujado-mano_23-2149857661.jpg?semt=ais_hybrid',
    },
    {
      title: 'Biology Research Conference',
      shortDescription:
        'Exploring recent advancements in genomics and biotechnology.',
    },
    // Add more events as needed
  ]

  return (
    <Card className="space-y-1 p-1 bg-[#f7f7f8] border-0">
      <div className="p-2">
        <p> </p>
      </div>
      {events2.map((event, index) => (
        <EventCard event={event} />
      ))}
    </Card>
  )
}

function EventCard({ event }) {
  const { title, shortDescription, logoURL } = event
  const image = logoURL ? <Avatar src={logoURL} /> : null

  return (
    <CardWithFocus
      imageIcon={image}
      onClick={() => alert(title)}
      containerClassNames={'bg-white'}
    >
      <div className="flex-grow">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground italic">
          {shortDescription}
        </p>
      </div>
    </CardWithFocus>
  )
}
