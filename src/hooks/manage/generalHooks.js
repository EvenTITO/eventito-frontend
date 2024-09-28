import {getEventId, wait} from "@/lib/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HTTPClient} from "@/services/api/HTTPClient.js";
import {EVENTS_URL} from "@/lib/Constants.js";
import {uploadFile} from "@/services/api/storage/queries.js";
import {apiGetUploadEventImageUrl} from "@/services/api/events/general/queries.js";

export function useEditEvent() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({eventData}) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", {eventId}],
      });
    },
  });
}

export function useUploadEventImage() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({imageName, image}) => await uploadEventImage(eventId, imageName, image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", {eventId}],
      });
    },
  });
}

async function uploadEventImage(eventId, imageName, image) {
  console.log(imageName)
  console.log(image)
  if (image) {
    const httpClient = new HTTPClient(EVENTS_URL)
    const uploadUrl = await apiGetUploadEventImageUrl(httpClient, eventId, imageName)
    console.log(uploadUrl)
    await uploadFile(uploadUrl, image)
  }
}
