import {EVENTS_URL} from "@/lib/Constants";
import {getEventId, getWorkId, wait} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {apiGetAssignments, apiPostReview} from "@/services/api/events/reviewer/queries";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {convertAssignments} from "@/services/api/events/reviewer/conversor.js";

export function useGetMyAssignments() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getMyAssignments", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const assignments = await apiGetAssignments(httpClient, eventId);
      console.log(assignments)
      return convertAssignments(assignments);
    },
  });
}

export function useSubmitReview() {
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({review}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return await apiPostReview(httpClient, eventId, workId, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getMyAssignments", {eventId}]});
    },
  });
}
