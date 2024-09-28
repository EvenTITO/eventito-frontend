import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId, wait } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetMyWorks, apiPutWork, apiGetSubmissionUploadUrl } from "@/services/api/works/queries";
import { convertMyWorks } from "@/services/api/works/conversor";
import { getWorkById } from "@/hooks/events/worksHooks"
import { uploadFile } from "@/services/api/storage/queries"

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

export function useNewSubmission() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionData }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyWorks"],
      });
    },
  });
}

async function uploadSubmissionFile(eventId, workId, file) {
  if(file){
    const httpClient = new HTTPClient(EVENTS_URL)
    const updloadUrl = await apiGetSubmissionUploadUrl(httpClient, eventId, workId)
    await uploadFile(updloadUrl.upload_url, file)
  }
}

export function useEditSubmission() {
  const eventId = getEventId();
  const workId = getWorkId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionData }) => {
      console.log(`submissionData: ${JSON.stringify(submissionData)}`)
      const httpClient = new HTTPClient(EVENTS_URL)
      const work = await queryClient.ensureQueryData(
        {queryKey: ["getWorkById", { workId }],
          queryFn: async () => await getWorkById(eventId, workId)})
      
      const workUpdate = {
        ...submissionData,
        keywords: work.keywords !== undefined ? submissionData.keywords.split(','): [],
        authors: work.authors
      }
      await apiPutWork(httpClient, eventId, workId, workUpdate)

      await uploadSubmissionFile(eventId, workId, submissionData.file)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyWorks"],
      })
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
