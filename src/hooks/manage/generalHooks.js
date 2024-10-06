import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '@/services/api/storage/queries.js'
import {
  apiGetUploadEventImageUrl,
  apiUpdateGeneralEvent,
  apiUpdateEventStatus,
} from '@/services/api/events/general/queries'

export function useEditEvent() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      await apiUpdateGeneralEvent(httpClient, eventId, { ...eventData })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
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
