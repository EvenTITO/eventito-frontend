import { getEventId } from '@/lib/utils'
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
      await apiUpdateGeneralEvent(eventId, { ...eventData })
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
    const uploadUrl = await apiGetUploadEventImageUrl(eventId, imageName)
    await uploadFile(uploadUrl, image)
  }
}

export function useUpdateEventStatus() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newStatus }) => {
      await apiUpdateEventStatus(eventId, { status: newStatus })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}
