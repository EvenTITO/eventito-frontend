import {EVENTS_URL} from "@/lib/Constants";
import {HTTPClient} from "@/services/api/HTTPClient";
import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateReviewSkeleton } from "@/services/api/events/general/queries";
import { convertReviewSkeleton } from "@/services/api/events/general/conversor";
export function useAddQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newQuestion, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      
      const originQuestions = JSON.parse(JSON.stringify(reviewSkeleton.questions));

      originQuestions.push(newQuestion)
      const newReviewSkeleton = convertReviewSkeleton(originQuestions)
      
      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useDeleteQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ idx, questionToDelete, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)

      const originQuestions = JSON.parse(JSON.stringify(reviewSkeleton.questions));
      originQuestions.slice(idx-1, 1)
      const newReviewSkeleton = convertReviewSkeleton(originQuestions)
      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useUpdateQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ idx, updatedQuestion, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const originQuestions = JSON.parse(JSON.stringify(reviewSkeleton.questions));
      originQuestions[idx] = updatedQuestion
      const newReviewSkeleton = convertReviewSkeleton(originQuestions)

      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useAddOrChangeDeadlineSubmissionDate() {
  // Si quieren las dividimos en dos

  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newDate }) => {
      // Aclaracion: new date es solo la fecha: el contexto ya les dice
      // que es la de submission date
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
