import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGetEventMembers, apiPutMemberRole } from "./queries";
import { CHAIR_ROLE, EVENTS_URL, ORGANIZER_ROLE } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { convertEventMembers } from "./conversor";

export function useQueryMembers(eventId) {
  return useQuery({
    queryKey: ["getEventMembers", eventId],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventMembers = await apiGetEventMembers(httpClient, eventId);
      return convertEventMembers(eventMembers);
    },
  });
}

export function updateMemberRole() {
  return useMutation({
    mutationFn: async ({ userId, eventId, newRole }) => {
      const roles = [newRole];
      if (newRole === ORGANIZER_ROLE) {
        roles.push(CHAIR_ROLE);
      }
      const httpClient = new HTTPClient(EVENTS_URL);
      return await apiPutMemberRole(httpClient, userId, roles, eventId);
    },
    onSuccess: (data) => {
      console.log("Role actualizado con exito");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
