import { useUpdateEventStatus } from '@/hooks/manage/generalHooks'
import { STARTED_STATUS } from '@/lib/Constants'
import { Button } from '@nextui-org/button'

export default function PublishEventButton({ conditionsMet }) {
  if (!conditionsMet) return null
  const { mutateAsync: updateEventStatus, isPending } = useUpdateEventStatus()

  async function publishEvent() {
    await updateEventStatus({ newStatus: STARTED_STATUS })
  }

  return (
    <Button
      color="primary"
      className="w-full"
      onPress={publishEvent}
      isLoading={isPending}
    >
      {isPending ? <p>Publicando evento...</p> : <p>Publicar evento</p>}
    </Button>
  )
}
