/*
 *  Custom hooks to consume for the api of the events,
 *  wrapping the backend calls.
 * */

import { useQuery } from "@tanstack/react-query";
import { apiGetAllEvents } from "./queries";

export function getPublicEvents() {
  return useQuery({
    queryKey: ["getPublicEvents"],
    queryFn: () => apiGetAllEvents()
  })
}
