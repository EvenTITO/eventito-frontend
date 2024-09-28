import {EVENTS_URL} from "@/lib/Constants";
import { getEventId, wait} from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/services/api/storage/queries.js";
import { apiUpdateGeneralEvent } from "@/services/api/events/general/queries"
import {apiGetUploadEventImageUrl} from "@/services/api/events/general/queries.js";

export function useEditEvent() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventData }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const updateEvent = {
        ...eventData
      }
      const r = await apiUpdateGeneralEvent(httpClient, eventId, updateEvent)
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
