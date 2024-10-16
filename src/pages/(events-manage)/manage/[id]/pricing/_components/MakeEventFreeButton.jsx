import { SPEAKER_ROLE, ATTENDEE_ROLE } from '@/lib/Constants.js'
import ConfirmFreeEventDialog from './ConfirmFreeEventDialog'

export default function MakeEventFreeButton({ onMakeEventFree, isLoading }) {
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
    <ConfirmFreeEventDialog
      onConfirm={handleMakeEventFree}
      isLoading={isLoading}
    />
  )
}
