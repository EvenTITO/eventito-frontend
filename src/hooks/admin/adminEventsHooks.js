import { EVENTS_URL } from '@/lib/Constants'
import {
  apiGetAllEventsWaitingApproval,
  apiAdminUpdateEventStatus,
} from '@/services/api/admin/events/queries'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { convertEventsWaitingApproval } from '@/services/api/admin/events/conversor'
import { HTTPClient } from '@/services/api/HTTPClient'

export function useGetEventsWaitingApproval() {
  return useQuery({
    queryKey: ['getEventsWaitingApproval'],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      // TODO: add offset & limit.
      const eventData = await apiGetAllEventsWaitingApproval(httpClient)
      const events = convertEventsWaitingApproval(eventData)
      console.log(`los events waiting approval son: ${JSON.stringify(events)}`)
      return events
    },
  })
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, newStatus }) => {
      // newStatus must be one of: "WAITING_APPROVAL", "NOT_APPROVED",
      // "CREATED", "STARTED","FINISHED", "SUSPENDED", "CANCELED", "BLOCKED"
      const httpClient = new HTTPClient(EVENTS_URL)
      await apiAdminUpdateEventStatus(httpClient, eventId, {
        status: newStatus,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventsWaitingApproval'],
      })
    },
    onError: (e) => {
      console.log(e)
      console.error(JSON.stringify(e))
    },
  })
}
