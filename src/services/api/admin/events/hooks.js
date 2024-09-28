import { EVENTS_URL } from "@/lib/Constants"
import {
  apiGetAllEventsWaitingApproval,
} from "./queries";
import { useQuery } from "@tanstack/react-query"
import { convertEventsWaitingApproval } from "./conversor"
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
