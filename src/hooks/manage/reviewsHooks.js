import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventById } from "@/hooks/events/useEventState"
import {HTTPClient} from "@/services/api/HTTPClient.js";
import { apiUpdateEventDates } from "@/services/api/events/general/queries"


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

export function useAddOrChangeDeadlineSubmissionDate() {
  // Si quieren las dividimos en dos

  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ newDate }) => {
      const event = await queryClient.ensureQueryData({
        queryKey: ["getEventById", {eventId}],
        queryFn: async () => await getEventById(eventId),
      });
      const httpClient = new HTTPClient(EVENTS_URL);
      let newDates = event.dates.slice();
      const submissionDateIndex = event.dates.findIndex(date => date.name === "SUBMISSION_DEADLINE_DATE");
      // Assuming newDate is of type Date.
      // Extract the date (in the format "YYYY-MM-DD")
      const date = newDate.toISOString().split('T')[0];

      // Extract the time (in the format "HH:MM")
      const time = newDate.toTimeString().split(' ')[0].slice(0, 5);

      newDates[submissionDateIndex].date = date;
      newDates[submissionDateIndex].time = time;
      await apiUpdateEventDates(httpClient, eventId, { dates: newDates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
