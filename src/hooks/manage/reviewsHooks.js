import {EVENTS_URL} from "@/lib/Constants";
import {HTTPClient} from "@/services/api/HTTPClient";
import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateReviewSkeleton } from "@/services/api/events/general/queries";
import { convertReviewSkeletonQuestions } from "@/services/api/events/general/conversor";
export function useAddQuestion() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newQuestion, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      
      reviewSkeleton.questions.push(newQuestion)
      const newReviewSkeleton = convertReviewSkeletonQuestions(reviewSkeleton.questions)
      
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
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionToDelete, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)

      const newQuestions = reviewSkeleton.questions.filter((q) => q.question !== questionToDelete);
      const newReviewSkeleton = convertReviewSkeletonQuestions(newQuestions)
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
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updatedQuestion, reviewSkeleton }) => {
      
      const newQuestions = reviewSkeleton.questions.map((q) => q.question === updatedQuestion.question ? updatedQuestion : q);
      const newReviewSkeleton = convertReviewSkeletonQuestions(newQuestions)

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
