import { getEventId } from '@/lib/utils'
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
      const works = await apiGetAllWorks(eventId)
      return convertWorksForOrganizer(works)
    },
  })
}

export function useChangeTalkForWork() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ workId, track, talk }) => {
      const talkData = {
        track: track,
        talk: talk,
      }
      await apiPutTalkForWork(eventId, workId, talkData)
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
