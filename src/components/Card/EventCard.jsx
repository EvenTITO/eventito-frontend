import { useNavigator } from '@/lib/navigation'
import CardWithFocus from './CardWithFocus'

export function Event({ title, description }) {
  return (
    <div className="flex-grow">
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground italic">{description}</p>
    </div>
  )
}

export default function EventCardWithFocus({
  eventId,
  title,
  description,
  size = 'md',
  logoURL = null,
}) {
  const sizesMap = {
    sm: 'h-[50px]',
    md: 'h-[100px]',
    lg: 'h-[150px]',
  }
  
  const navigator = useNavigator()

  return (
    <CardWithFocus
      imageIcon={logoURL}
      onClick={() => alert(eventId)}
      containerClassNames={`bg-white ${sizesMap[size]}`}
    >
      <Event title={title} description={description} />
    </CardWithFocus>
  )
}
