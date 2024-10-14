import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetEvent } from '@/hooks/events/useEventState'
import { dateIsValid, getDeadlineSubmissions, timeIsUp } from '@/lib/dates'
import { useNavigator } from '@/lib/navigation'

export default function NewWorkButton() {
  const navigator = useNavigator()
  const { data: eventData } = useGetEvent()
  const deadlineDate = getDeadlineSubmissions(eventData)?.date
  const deadlineTime = getDeadlineSubmissions(eventData)?.time

  function handleNewSubmission() {
    navigator.foward('new-work')
  }

  return (
    <Button onClick={handleNewSubmission} disabled={timeIsUp(deadlineDate, deadlineTime)}>
      <Plus className="mr-2 h-4 w-4" /> Nueva entrega
    </Button>
  )
}
