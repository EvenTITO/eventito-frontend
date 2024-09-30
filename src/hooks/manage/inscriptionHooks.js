import {EVENTS_URL} from "@/lib/Constants";
import {getEventId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useQuery} from "@tanstack/react-query";
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
