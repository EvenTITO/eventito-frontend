import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CHAIR_ROLE, EVENTS_URL, ORGANIZER_ROLE } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import {
  apiGetEventMembers,
  apiPutMemberRole,
  apiPostMember,
  apiDeleteMember
} from "@/services/api/events/members/queries";
import { convertEventMembers } from "@/services/api/events/members/conversor";


export function useAddMember() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newMemberEmail, newMemberRole }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const body = {
        email: newMemberEmail,
        role: newMemberRole
      };
      await apiPostMember(httpClient, eventId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventMembers"] });
    },
    onError: (error) => {
      console.error(JSON.stringify(error));
    }
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


export function useDeleteMember() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return await apiDeleteMember(httpClient, eventId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getEventMembers"] });
    },
  });
}