import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId, wait } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetMyWorks } from "@/services/api/works/queries"
import { convertMyWorks } from "@/services/api/works/conversor"

export function useGetMyWorks() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getMyWorks", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const myWorks = await apiGetMyWorks(httpClient, eventId)
      return convertMyWorks(myWorks)
    },
  });
}

export function useGetMySubmission() {
  const eventId = getEventId();
  const workId = getWorkId();

  return useQuery({
    queryKey: ["getMySubmission", { workId }],
    queryFn: async () => {
      // TODO (gsabatino9): necesitan userId?
      const httpClient = new HTTPClient(EVENTS_URL);
      return submissionData;
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

const submissionData = {
  title: "Trabajo de quimica",
  abstract: "Trabajo abstract",
  authors: [
    {
      full_name: "Gonzalo Sabatino",
      email: "gsabatino@fi.uba.ar",
      is_speaker: false,
      affiliation: "FIUBA",
    },
    {
      full_name: "Lucas Veron",
      email: "lveron@fi.uba.ar",
      is_speaker: false,
      affiliation: "FIUBA",
    },
    {
      full_name: "Fernando Sinisi",
      email: "fsinisi@fi.uba.ar",
      is_speaker: true,
      affiliation: "FIUBA",
    },
    {
      full_name: "Mateo Capon",
      email: "mcapon@fi.uba.ar",
      is_speaker: false,
      affiliation: "FIUBA",
    },
  ],
  track: "track1",
  keywords: ["IA", "Python"],
  deadline_date: "2024-09-26T23:43:00.573Z",
  creation_date: "2024-09-26T23:43:00.573Z",
  last_update: "2024-09-26T23:43:00.573Z",
  status: "Entregado",
};
