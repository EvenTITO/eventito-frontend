import { useQuery } from "@tanstack/react-query";
import { apiGetEventMembers } from "./queries";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";

export function useQueryMembers(eventId) {
  return useQuery({
    queryKey: ["getEventMembers", eventId],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      console.log(`Llamando a la api ${eventId}`)
      const eventMembers = await apiGetEventMembers(httpClient, eventId);
      console.log(`Se obtienen los members ${eventMembers}`)
      return eventMembers;
    },
  });
}

export function changeMemberRole() {
  return useQuery({
    queryKey: ["changeMemberRole"],
    queryFn: async (member, role) => {
      console.log("changing member role", member, role);
      // TODO: update con idx -> debo obtener info del miembro
      return null;
    },
  });
}
