import { getEventId } from '@/lib/utils'
import { apiGetEventById } from '@/services/api/events/general/queries'
import { useQuery } from '@tanstack/react-query'

export function useGetEvent(select = null) {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getEventById', { eventId }],
    queryFn: async () => {
      return await apiGetEventById(eventId)
    },
    ...(typeof select === 'function' ? { select } : {}),
  })
}
