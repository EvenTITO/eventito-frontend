import * as Tooltip from '@radix-ui/react-tooltip'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { CREATED_STATUS } from '@/lib/Constants.js'
import { canStartEvent } from '@/lib/utils.js'

export default function EventStatus({
  event,
  publishEvent,
  updateStatusLoading,
}) {
  if (event.status !== CREATED_STATUS) {
    return null
  }
  console.log('loading', updateStatusLoading)
  const canPublishEvent = canStartEvent(event)
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <ButtonWithLoading
              onClick={publishEvent}
              disabled={!canPublishEvent}
              isLoading={updateStatusLoading}
            >
              Publicar el evento
            </ButtonWithLoading>
          </span>
        </Tooltip.Trigger>
        {!canPublishEvent && (
          <Tooltip.Content
            side="top"
            align="center"
            className="bg-black/60 text-white p-2 rounded-lg text-sm shadow-lg backdrop-blur-sm max-w-[200px] break-words"
          >
            Para poder hacer el evento publico se deben completar las fechas
            obligatorias (día y horario) y definir al menos un track y una
            tarifa.
          </Tooltip.Content>
        )}
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
