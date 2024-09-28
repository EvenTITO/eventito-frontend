import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId, wait } from "@/lib/utils";
import { useSelector } from "react-redux";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetMyWorks, apiPutWork, apiGetSubmissionUploadUrl, apiPostWork } from "@/services/api/works/queries";
import { convertMyWorks } from "@/services/api/works/conversor";
import { getWorkById } from "@/hooks/events/worksHooks"
import { uploadFile } from "@/services/api/storage/queries"
import { getInscriptionWithPayments } from "@/hooks/events/attendeeHooks"


export function useGetMyWorks() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getMyWorks", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const myWorks = await apiGetMyWorks(httpClient, eventId);
      return convertMyWorks(myWorks);
    },
  });
}

export function useNewWork() {
  const eventId = getEventId();
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ workData }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const inscription = await queryClient.ensureQueryData({
        queryKey: ["getMyInscription", {eventId}],
        queryFn: async () => await getInscriptionWithPayments(eventId)
      })
      const work = {
        abstract: workData.abstract,
        title: workData.title,
        track: workData.track,
        keywords: workData.keywords.split(','),
        authors: [
          {
            full_name: currentUser.fullname,
            membership: inscription.affiliation,
            mail: currentUser.email,
            notify_updates: true,
            is_speaker: true,
            is_main: true
          }
        ]
      }
      const workId = await apiPostWork(httpClient, eventId, work);
      await uploadSubmissionFile(eventId, workId, workData.pdfFile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyWorks"],
      });
    },
  });
}

async function uploadSubmissionFile(eventId, workId, file) {
  if (!file) {
    console.log('No submission file given');
    return;
  }
  const httpClient = new HTTPClient(EVENTS_URL);
  const updloadUrl = await apiGetSubmissionUploadUrl(httpClient, eventId, workId);
  await uploadFile(updloadUrl.upload_url, file);
}

export function useEditWork() {
  const eventId = getEventId();
  const workId = getWorkId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ workData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const work = await queryClient.ensureQueryData(
        {queryKey: ["getWorkById", { workId }],
          queryFn: async () => await getWorkById(eventId, workId)})
      
      const workUpdate = {
        ...workData,
        keywords: work.keywords !== undefined ? workData.keywords.split(','): [],
        authors: work.authors
      }
      await apiPutWork(httpClient, eventId, workId, workUpdate)

      await uploadSubmissionFile(eventId, workId, workData.file)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getWorkById", { workId }],
      })
    },
  });
}
export function useAddAuthorToWork() {
  const eventId = getEventId();
  const workId = getWorkId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ authorData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const work = await queryClient.ensureQueryData(
        {queryKey: ["getWorkById", { workId }],
          queryFn: async () => await getWorkById(eventId, workId)})
      
      const workUpdate = {
        ...work,
        authors: [...work.authors, 
          {full_name: authorData.full_name,
            membership: authorData.affiliation,
            mail: authorData.email,
            notify_updates: authorData.notifyAuthor,
            is_speaker: authorData.isSpeaker,
            is_main: false
          }]
      }
      await apiPutWork(httpClient, eventId, workId, workUpdate)

    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getWorkById", { workId }],
      });
    },
  });
}
