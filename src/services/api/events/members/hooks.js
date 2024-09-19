import { useQuery } from "@tanstack/react-query";
import { apiGetEventMembers, apiPutMemberRole } from "./queries";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { convertEventMembers } from "./conversor";
import { EventRole } from "./common";

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
  return useMutation({
    mutationFn: async (userId, eventId, newRole) => {
      const roles = [newRole];
      if (newRole === EventRole.ORGANIZER) {
        roles.push(EventRole.CHAIR);
      }

      const httpClient = HTTPClient(EVENTS_URL);
      return await apiPutMemberRole(httpClient, userId, roles, eventId);
    },
    onSuccess: (data) => {
      console.log("Role actualizado con exito");
    },
    onError: (error) => {
      console.error("Rompio");
    },
  });
}
