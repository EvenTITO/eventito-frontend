import {EVENTS_URL} from "@/lib/Constants";
import {getEventId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {apiGetInscriptions, apiGetPayments} from "@/services/api/events/inscriptions/queries.js";
import {convertInscriptions} from "@/services/api/events/inscriptions/conversor.js";


export function useGetInscriptions() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getInscriptions", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const inscriptions = await apiGetInscriptions(httpClient, eventId);
      const payments = await apiGetPayments(httpClient, eventId);
      return convertInscriptions(inscriptions, payments);
    }
  });
}

export function useUpdate() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inscriptionId, newStatus }) => {
      // NewStatus must be one of: "APPROVED", "REJECTED", "PENDING_APPROVAL".
      const httpClient = new HTTPClient(EVENTS_URL);
      const update = {
        status: newStatus
      };
      await apiUpdateInscriptionsStatus(httpClient, eventId, inscriptionId, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getInscriptions", {eventId}],
      });
    },
  });
}