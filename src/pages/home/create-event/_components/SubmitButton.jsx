import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { createEvent } from '@/services/api/events/general/hooks'
import { addEventOptional } from '@/state/events/createEventSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function SubmitButton({ startDate, endDate, location }) {
  const navigate = useNavigate()
  const { event_type, title, description, organized_by } = useSelector(
    (state) => state.createEvent
  )
  const { mutate, isPending, isSuccess } = createEvent()
  const dispatch = useDispatch()
  const { toast } = useToast()

  function handleSubmit() {
    dispatch(
      addEventOptional({
        startDate: startDate,
        endDate: endDate,
        location: location,
      })
    )

    mutate({
      event_type,
      title,
      description,
      organized_by,
      location,
      startDate,
      endDate,
    })
  }

  useEffect(() => {
    if (isPending) {
      console.log('loading...')
    }

    if (isSuccess) {
      navigate('/home/my-events')
    }
  }, [isPending, isSuccess, navigate, toast])

  if (isPending) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Creando...
      </Button>
    )
  } else {
    return (
      <Button type="button" onClick={handleSubmit}>
        Crear evento
      </Button>
    )
  }
}
