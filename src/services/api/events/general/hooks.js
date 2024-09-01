/*
 *  Custom hooks to consume for the api of the events,
 *  wrapping the backend calls.
 * */

import { useQuery } from "@tanstack/react-query";
import { apiGetAllEvents } from "./queries";
import { convertEventData } from "./conversor";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";

export function getPublicEvents() {
  return useQuery({
    queryKey: ["getPublicEvents"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetAllEvents(httpClient);
      return convertEventData(eventData);
    },
  });
}
