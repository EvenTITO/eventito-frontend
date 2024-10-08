import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '@/services/api/storage/queries.js'
import {
  apiGetUploadEventImageUrl,
  apiUpdateEventStatus,
  apiUpdateGeneralEvent,
} from '@/services/api/events/general/queries'
import { useToastMutation } from '@/hooks/use-toast-mutation.js'

export function useEditEvent() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ eventData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      await apiUpdateGeneralEvent(httpClient, eventId, { ...eventData })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getEventById', { eventId }],
        })
      },
    },
    {
      success: {
        show: true,
        title: 'Evento editado',
        message: 'Se editó la información del evento de forma correcta',
      },
      error: {
        title: 'Edición de evento fallida',
        message:
          'Ocurrió un error al editar el evento. Por favor intente más tarde',
      },
    }
  )
}

export function useUploadEventImage() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ imageName, image }) =>
      await uploadEventImage(eventId, imageName, image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

async function uploadEventImage(eventId, imageName, image) {
  if (image) {
    const httpClient = new HTTPClient(EVENTS_URL)
    const uploadUrl = await apiGetUploadEventImageUrl(
      httpClient,
      eventId,
      imageName
    )
    await uploadFile(uploadUrl, image)
  }
}

export function useUpdateEventStatus() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newStatus }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      await apiUpdateEventStatus(httpClient, eventId, { status: newStatus })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}
