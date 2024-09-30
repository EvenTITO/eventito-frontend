import { EVENTS_URL } from "@/lib/Constants"
import {
  apiGetAllEventsWaitingApproval,
  apiAdminUpdateEventStatus
} from "@/services/api/admin/events/queries";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { convertEventsWaitingApproval } from "@/services/api/admin/events/conversor"
import { HTTPClient } from "@/services/api/HTTPClient"

export function getEventsWaitingApproval() {
  return useQuery({
    queryKey: ["getEventsWaitingApproval"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      // TODO: add offset & limit.
      const eventData = await apiGetAllEventsWaitingApproval(httpClient);
      return convertEventsWaitingApproval(eventData);
    },
  });
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({eventId, newStatus}) => {
      // newStatus must be one of: "WAITING_APPROVAL", "NOT_APPROVED", 
      // "CREATED", "STARTED","FINISHED", "SUSPENDED", "CANCELED", "BLOCKED"
      const httpClient = new HTTPClient(EVENTS_URL);
      await apiAdminUpdateEventStatus(httpClient, eventId, {status: newStatus});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventsWaitingApproval"],
      });
    },
    onError: (e) => {
      console.error(JSON.stringify(e));
    },
  });
}
