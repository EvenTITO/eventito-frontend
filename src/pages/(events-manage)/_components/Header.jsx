import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigator } from '@/lib/navigation'
import { getEventId } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import PublishEventButton from './PublishEventButton'

export default function Header({
  eventTitle,
  organizerPage = false,
  isOrganizer = false,
  event,
}) {
  const navigator = useNavigator()
  const eventId = getEventId()

  function handleGoTo() {
    if (organizerPage) {
      navigator.to(`/events/${eventId}/view/general`)
    } else {
      navigator.to(`/manage/${eventId}/general`)
    }
  }

  return (
    <header className="bg-white border-b h-12 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">{eventTitle}</h1>
        {organizerPage ? <Badge variant="secondary">Organizador</Badge> : null}
      </div>
      {isOrganizer && (
        <div className="flex items-center space-x-4">
          {organizerPage && <PublishEventButton event={event} />}
          <Button variant="ghost" size="sm" onClick={handleGoTo}>
            {organizerPage ? <Eye className="h-4 w-4 mr-2" /> : null}
            {organizerPage ? 'Ver sitio del evento' : 'Sitio de organizador'}
          </Button>
        </div>
      )}
    </header>
  )
}
