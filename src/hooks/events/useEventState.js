import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { apiGetEventById } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";

export function useGetEvent(eventId) {
  return useQuery({
    queryKey: ["getEventById2", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetEventById(httpClient, eventId);
      return eventData;
    },
  });
}
