import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { SPEAKER_ROLE, ATTENDEE_ROLE } from '@/lib/Constants.js'

export default function MakeEventFreeButton({ onMakeEventFree }) {
  const handleMakeEventFree = () => {
    const freePrice = {
      name: 'Tarifa gratuita del evento',
      description: 'Tarifa para cualquier participante del evento',
      value: 0,
      roles: [SPEAKER_ROLE, ATTENDEE_ROLE],
      related_date: null,
      need_verification: false,
    }
    onMakeEventFree(freePrice)
  }

  return (
    <Button onClick={handleMakeEventFree} className="w-full">
      <Zap className="h-4 w-4 mr-2" />
      Hacer evento gratuito
    </Button>
  )
}
