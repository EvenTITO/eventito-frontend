import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetWorksByTrack, apiGetReviewsForWork, apiGetReviewersForWork } from "@/services/api/works/queries";
import { convertWorks, convertReviews, convertReviewers } from "@/services/api/works/conversor";

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
    queryKey: ["getReviewersForWork", { workId }],
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
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getReviewsForWork", {workId}]});
    },
  });
}

function getReviewersPending(reviews, reviewers) {
  const reviews_emails = reviews != undefined && reviews.data != undefined ? reviews.data.map(r => r.email) : [];
  const reviewers_pending = reviewers != undefined && reviewers.data != undefined ? reviewers.data.filter(r => !reviews_emails.includes(r.email)) : [];
  return reviewers_pending.map(rp => rp.email)
}


export function getReviewersWithStatus(reviews, reviewers) {
  const reviewers_email_pending = getReviewersPending(reviews, reviewers)
  if(reviewers != undefined && reviewers.data != undefined){
    reviewers.data.forEach(r => {
      if(reviewers_email_pending.includes(r.email)){
        r['completed'] = false
      } else {
        r['completed'] = true
      }
    });
  }
  return reviewers
}