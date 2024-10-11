import {
  apiGetAllEventsWaitingApproval,
  apiAdminUpdateEventStatus,
} from '@/services/api/admin/events/queries'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { convertEventsWaitingApproval } from '@/services/api/admin/events/conversor'

export function useGetEventsWaitingApproval() {
  return useQuery({
    queryKey: ['getEventsWaitingApproval'],
    queryFn: async () => {
      // TODO: add offset & limit.
      const eventData = await apiGetAllEventsWaitingApproval()
      return convertEventsWaitingApproval(eventData)
    },
  })
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, newStatus }) => {
      // newStatus must be one of: "WAITING_APPROVAL", "NOT_APPROVED",
      // "CREATED", "STARTED","FINISHED", "SUSPENDED", "CANCELED", "BLOCKED"
      await apiAdminUpdateEventStatus(eventId, {
        status: newStatus,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventsWaitingApproval'],
      })
    },
  })
}
