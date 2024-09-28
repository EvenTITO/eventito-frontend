import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CHAIR_ROLE, EVENTS_URL, ORGANIZER_ROLE } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import {
  apiGetEventMembers,
  apiPutMemberRole,
} from "@/services/api/events/members/queries";
import { convertEventMembers } from "@/services/api/events/members/conversor";

export function useAddMember() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newMemberEmail, newMemberRole }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventMembers"] });
    },
  });
}

export function useGetMembers() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getEventMembers", eventId],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventMembers = await apiGetEventMembers(httpClient, eventId);
      return convertEventMembers(eventMembers);
    },
  });
}

export function useUpdateMemberRole() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const roles = [newRole];
      if (newRole === ORGANIZER_ROLE) {
        roles.push(CHAIR_ROLE);
      }
      const httpClient = new HTTPClient(EVENTS_URL);
      return await apiPutMemberRole(httpClient, userId, roles, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventMembers"] });
    },
  });
}
