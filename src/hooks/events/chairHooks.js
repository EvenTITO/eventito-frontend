import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetWorksByTrack, apiGetReviewsForWork, apiGetReviewersForWork } from "@/services/api/works/queries";
import { convertWorks, convertReviews, convertReviewers } from "@/services/api/works/conversor";

export function useGetWorksByTrack(track) {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getWorksByTrack", { eventId, track }],
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
    queryKey: ["getReviewsForWork", { workId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const workReviews = await apiGetReviewsForWork(httpClient, eventId, workId);
      console.log(`llegan las reviews: ${JSON.stringify(workReviews)}`)
      console.log(`reviews harcoded: ${JSON.stringify(reviews)}`)
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
    mutationFn: async ({ email, deadline }) => {
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReviewsForAssignment"] });
    },
  });
}

const reviewForm = [
  {
    title: "Calificación general",
    answer: 8,
  },
  {
    title: "Recomendación",
    answer: "Aceptado",
  },
  {
    title: "Área de mejora",
    answer: "Ninguna",
  },
  {
    title: "Comentarios a los autores",
    answer:
      "Muy buen trabajo general, revisar que todas las imágenes tengan el mismo tamaño para el momento de la presentación.",
  },
];

const reviews = [
  {
    reviewer: "Gonzalo Sabatino",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "Aceptado",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Fernando Sinisi",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "A revisión",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Lucas Verón",
    completed: false,
    deadlineDate: "2024/09/20",
    status: null,
    reviewForm: null,
  },
];
