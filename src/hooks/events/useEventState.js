import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { apiGetEventById } from '@/services/api/events/general/queries'
import { useQuery } from '@tanstack/react-query'

export function useGetEvent(select = null) {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getEventById', { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      return await apiGetEventById(httpClient, eventId)
    },
    ...(typeof select === 'function' ? { select } : {}),
  })
}
