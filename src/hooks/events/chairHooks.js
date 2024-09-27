import {EVENTS_URL} from "@/lib/Constants";
import {getEventId, getWorkId, wait} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGetReviewersForWork, apiGetReviewsForWork, apiGetWorksByTrack} from "@/services/api/works/queries";
import {convertReviewers, convertReviews, convertWorks} from "@/services/api/works/conversor";
import {apiPutReviewDeadline, apiPostAddReviewer, apiPostReviewsPublish} from "@/services/api/events/reviewer/queries";
import {format} from "date-fns";

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

export function useGetReviewersForWork() {
  const workId = getWorkId();
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getReviewersForWork", {workId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const reviewers = await apiGetReviewersForWork(httpClient, eventId, workId);
      return convertReviewers(reviewers)
    },
  });
}

export function useAddReviewer() {
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({email, deadline}) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const review_deadline = format(new Date(deadline), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")

      const reviewer = {
        review_deadline: review_deadline,
        work_id: workId,
        email: email
      }
      const reviewers = { reviewers: [reviewer] }

      return await apiPostAddReviewer(httpClient, eventId, reviewers)
      },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getReviewersForWork", {workId}]})
    },
  })
}

export function useSubmitChairReview(reviews) {
  const reviewsIds = reviews != undefined ? reviews.map(r => r.reviewId) : []
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({status, deadlineDate}) => {
      console.log(`status: ${status}`)

      const httpClient = new HTTPClient(EVENTS_URL);

      let reviewsToPublish = {
        reviews_to_publish: reviewsIds,
        new_work_status: status,
      }
      if(deadlineDate != undefined){
        const formattedDatetime = format(new Date(deadlineDate), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
        reviewsToPublish.resend_deadline = formattedDatetime
      }
      return await apiPostReviewsPublish(httpClient, eventId, workId, reviewsToPublish)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getReviewsForWork", {workId}]});
    },
    onError: (error) => {
      const errorDesc = `Ups!! Hubo 1 Er0rr!\nError description: ${error}\nError Detail: ${error.response.data.detail}`
      console.error(errorDesc);
      alert(errorDesc)
    }
  });
}

export function useUpdateReviewDeadlineForReviewer() {
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({reviewerId, deadline}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const formattedDatetime = format(new Date(deadline), "yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
      const reviewer = {
        work_id: workId,
        user_id: reviewerId,
        review_deadline: formattedDatetime,
      }
      return await apiPutReviewDeadline(httpClient, eventId, reviewer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getReviewersForWork", {workId}]});
    },
  });
}

