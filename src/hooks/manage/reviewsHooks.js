import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetEvent } from "@/hooks/events/useEventState.js";
import { HTTPClient } from "@/services/api/HTTPClient.js";
import { EVENTS_URL } from "@/lib/Constants.js";
import { apiUpdateDatesEvent } from "@/services/api/events/general/queries.js";
import { format } from "date-fns";

export function useAddQuestion() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newQuestion, reviewSkeleton }) => {
      // Datos que dejo con ESTOS MISMOS NOMBRES EN SUS VALORES:
      //
      // newQuestion:
      //  - questionType: rating, multiple_choice, simple_question
      //  - moreThanOneAnswerAllowed: true o false
      //  - options: opcion única || lista de opciones
      //
      // Si hacen un set por reviewSkeleton + newQuestion con name,
      // llamo a esta función para modificar. En ese caso le ponemos useAddOrModifyQuestion
      console.log(newQuestion);
      await wait(1);
      return null;
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
      // en este caso voy a pasar: el question.question
      // deberías hacer algo como:
      //
      // reviewSkeleton.questions.filter((q) => q.question !== questionToDelete);
      // y publicar eso
      console.log(questionToDelete);
      await wait(1);
      return null;
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
      // en este caso voy a pasar: el question
      // deberías hacer algo como:
      //
      // reviewSkeleton.questions.map((q) => q.question === updatedQuestion.question ? updatedQuestion : q);
      // y publicar eso
      console.log(updatedQuestion);
      await wait(1);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useEditEventDeadlineSubmissionDate() {
  const eventId = getEventId();
  const queryClient = useQueryClient();
  const useAddOrChangeDate = useEditEventDate("SUBMISSION_DEADLINE_DATE");
  return useMutation({
    mutationFn: async ({ newDate }) => {
      await useAddOrChangeDate.mutateAsync({ newDate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useEditEventDate(dateName) {
  const eventId = getEventId();
  const { data: event } = useGetEvent(eventId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newDate }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const newDates = event.dates.slice();
      const dateIndex = event.dates.findIndex((date) => date.name === dateName);
      newDates[dateIndex].date = format(newDate, "yyyy-MM-dd");
      newDates[dateIndex].time = format(newDate, "HH:mm:ss");
      return await apiUpdateDatesEvent(httpClient, eventId, {
        dates: newDates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
