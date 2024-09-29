import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
