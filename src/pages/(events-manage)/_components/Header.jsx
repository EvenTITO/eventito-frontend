import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useNavigator } from '@/lib/navigation'
import { getEventId } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default function Header({ eventTitle, isOrganizer = false }) {
  const navigator = useNavigator()
  const eventId = getEventId()

  function handleGoTo() {
    if (isOrganizer) {
      navigator.to(`/events/${eventId}/view/general`)
    } else {
      navigator.to(`/manage/${eventId}/general`)
    }
  }

  return (
    <header className="bg-white border-b h-12 flex items-center px-4">
      <div className="flex gap-2">
        <h1 className="text-lg font-semibold">{eventTitle}</h1>
        {isOrganizer ? <Badge variant="secondary">Organizador</Badge> : null}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={handleGoTo}>
          {isOrganizer ? <Eye className="h-4 w-4 mr-2" /> : null}
          {isOrganizer ? 'Ver sitio del evento' : 'Sitio de organizador'}
        </Button>
      </div>
    </header>
  )
}
