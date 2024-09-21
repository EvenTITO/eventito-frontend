import { HTTPClient } from "@/services/api/HTTPClient";
import { apiGetEventById } from "@/services/api/events/general/queries";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export function useEventState(eventId) {
  const queryClient = useQueryClient();

  const { data: eventData, isLoading } = useQuery({
    queryKey: ["getEventById", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetEventById(httpClient, eventId);
      return eventData;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { eventData, isLoading };
}
