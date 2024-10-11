import * as Tooltip from '@radix-ui/react-tooltip'
import { Button } from '@/components/ui/button'
import { CREATED_STATUS } from '@/lib/Constants.js'
import { canStartEvent } from '@/lib/utils.js'

export default function EventStatus({ event, publishEvent }) {
  if (event.status !== CREATED_STATUS) {
    return null
  }
  const canPublishEvent = canStartEvent(event)
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <Button
              size="sm"
              onClick={publishEvent}
              disabled={!canPublishEvent}
            >
              Publicar el evento
            </Button>
          </span>
        </Tooltip.Trigger>
        {!canPublishEvent && (
          <Tooltip.Content
            side="top"
            align="center"
            className="bg-black/60 text-white p-2 rounded-lg text-sm shadow-lg backdrop-blur-sm max-w-[200px] break-words"
          >
            Para poder hacer el evento publico se deben completar las fechas
            obligatorias y definir al menos un track y una tarifa.
          </Tooltip.Content>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
