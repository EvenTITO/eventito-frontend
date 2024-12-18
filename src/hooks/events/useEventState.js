import { getEventId } from '@/lib/utils'
import { convertEventItem } from '@/services/api/events/general/conversor'
import { apiGetEventById } from '@/services/api/events/general/queries'
import { useQuery } from '@tanstack/react-query'

export function useGetEvent(select = null) {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getEventById', { eventId }],
    queryFn: async () => {
      const eventInfo = await apiGetEventById(eventId)

      return {
        ...eventInfo,
        ...convertEventItem(eventInfo),
      }
    },
    ...(typeof select === 'function' ? { select } : {}),
  })
}
