import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useQuery } from "@tanstack/react-query";
import { apiGetWorkById } from "@/services/api/works/queries"
import { convertWork } from "@/services/api/works/conversor"


export function useGetWorkById() {
  const workId = getWorkId();
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getWorkById", { workId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const work = await apiGetWorkById(httpClient, eventId, workId);
      return convertWork(work);
    },
  });
}
