import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useQuery } from '@tanstack/react-query'
import { apiGetAllWorks } from '@/services/api/events/organizer/queries'
import { convertWorksForOrganizer } from '@/services/api/events/organizer/conversor'

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
