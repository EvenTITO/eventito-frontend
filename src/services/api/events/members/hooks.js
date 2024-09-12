import { useQuery } from "@tanstack/react-query";
import { apiGetEventMembers } from "./queries";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { convertEventMembers } from "./conversor";
import { getMembers } from "./mockData";

export function useQueryMembers(eventId) {
  return useQuery({
    queryKey: ["getEventMembers", eventId],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventMembers = await apiGetEventMembers(httpClient, eventId);
      const eventMembersConverted = convertEventMembers(eventMembers);
      return eventMembersConverted;
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
