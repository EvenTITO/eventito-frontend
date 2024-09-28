import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId, wait } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetMyWorks } from "@/services/api/works/queries";
import { convertMyWorks } from "@/services/api/works/conversor";

export function useGetMyWorks() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getMyWorks", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const myWorks = await apiGetMyWorks(httpClient, eventId);
      return convertMyWorks(myWorks);
    },
  });
}

export function useNewSubmission() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionData }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyWorks"],
      });
    },
  });
}

export function useEditSubmission() {
  const eventId = getEventId();
  const workId = getWorkId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionData }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMySubmission"],
      });
    },
  });
}

export function useAddAuthorToWork() {
  const eventId = getEventId();
  const workId = getWorkId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ authorData }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMySubmission"],
      });
    },
  });
}
