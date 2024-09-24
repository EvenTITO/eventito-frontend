import {EVENTS_URL} from "@/lib/Constants";
import {getEventId, getWorkId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGetReviewsForWork, apiGetWorksByTrack} from "@/services/api/works/queries";
import {convertReviews, convertWorks} from "@/services/api/works/conversor";

export function useGetWorksByTrack(track) {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getWorksByTrack", {eventId, track}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const works = await apiGetWorksByTrack(httpClient, eventId, track);
      return convertWorks(works);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useGetReviewsForWork() {
  const workId = getWorkId();
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getReviewsForWork", {workId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const workReviews = await apiGetReviewsForWork(httpClient, eventId, workId);
      return convertReviews(workReviews);
    },
  });
}

export function useAddReviewer() {
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({email, deadline}) => {
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getReviewsForAssignment"]});
    },
  });
}
