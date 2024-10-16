import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { CREATED_STATUS, STARTED_STATUS } from '@/lib/Constants.js'
import { canStartEvent } from '@/lib/utils.js'
import { useUpdateEventStatus } from '@/hooks/manage/generalHooks'
import { useNavigator } from '@/lib/navigation'

export default function PublishEventButton({ event }) {
  const [isPublishing, setIsPublishing] = useState(false)
  const { mutateAsync: updateEventStatus } = useUpdateEventStatus()
  const navigator = useNavigator()

  if (event.status !== CREATED_STATUS) {
    return null
  }

  const canPublishEvent = canStartEvent(event)

  const publishEvent = async () => {
    setIsPublishing(true)
    try {
      await updateEventStatus({ newStatus: STARTED_STATUS })
      navigator.to('/home')
    } catch (error) {
      console.error('Failed to publish event:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <Button
              variant="outline"
              size="sm"
              onClick={publishEvent}
              disabled={!canPublishEvent || isPublishing}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Publicar evento
            </Button>
          </span>
        </Tooltip.Trigger>
        {!canPublishEvent && (
          <Tooltip.Content
            side="bottom"
            align="center"
            className="bg-black/60 text-white p-2 rounded-lg text-sm shadow-lg backdrop-blur-sm max-w-[200px] break-words"
          >
            Para poder hacer el evento público se deben completar las fechas
            obligatorias (día y horario) y definir al menos un track y una
            tarifa.
          </Tooltip.Content>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
