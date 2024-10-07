import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  apiGetAllWorks,
  apiPutTalkForWork,
} from '@/services/api/events/organizer/queries'
import { convertWorksForOrganizer } from '@/services/api/events/organizer/conversor'
import { useToastMutation } from '../use-toast-mutation'

export function useGetAllWorksForOrganizer() {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getAllWorksForOrganizer', { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const works = await apiGetAllWorks(httpClient, eventId)
      return convertWorksForOrganizer(works)
    },
  })
}

export function useChangeTalkForWork() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ workId, track, talk }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const talkData = {
        track: track,
        talk: talk,
      }
      await apiPutTalkForWork(httpClient, eventId, workId, talkData)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getAllWorksForOrganizer', { eventId }],
        })
      },
    }
  )
}
