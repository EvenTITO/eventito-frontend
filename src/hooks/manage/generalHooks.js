import {EVENTS_URL} from "@/lib/Constants";
import { getEventId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateGeneralEvent } from "@/services/api/events/general/queries"

export function useEditEvent() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const updateEvent = {
        ...eventData
      }
      const r = await apiUpdateGeneralEvent(httpClient, eventId, updateEvent)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
