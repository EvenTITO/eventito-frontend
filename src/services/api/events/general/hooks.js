/*
 *  Custom hooks to consume for the api of the events,
 *  wrapping the backend calls.
 * */

import { useQuery } from "@tanstack/react-query";
import { apiGetAllEvents, apiGetMyEvents } from "./queries";
import { convertEventData, convertMyEventsData } from "./conversor";
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

export function getMyEvents() {
  return useQuery({
    queryKey: ["getMyEvents"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetMyEvents(httpClient);
      return convertMyEventsData(eventData);
    },
  });
}
