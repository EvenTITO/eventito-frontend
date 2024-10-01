import { EVENTS_URL, SPEAKER_ROLE } from '@/lib/Constants'
import { getEventId, getWorkId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  apiGetSubmissionsForWork,
  apiGetWorkById,
  apiGetWorkDownloadURL,
} from '@/services/api/works/queries'
import { convertWork } from '@/services/api/works/conversor'
import { useGetMyWorks } from './authorHooks'

export function useGetWorkById() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getWorkById', { workId }],
    queryFn: async () => await getWorkById(eventId, workId),
  })
}

export const getWorkById = async (eventId, workId) => {
  const httpClient = new HTTPClient(EVENTS_URL)
  const work = await apiGetWorkById(httpClient, eventId, workId)
  const submissions = await apiGetSubmissionsForWork(
    httpClient,
    eventId,
    workId
  )
  return convertWork(work, submissions)
}

export function useGetWorkDownloadURL() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useMutation({
    mutationFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      return await apiGetWorkDownloadURL(httpClient, eventId, workId)
    },
  })
}

export function useGetWorksForPayment({ roles }) {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getWorksForPayment', { eventId }],
    queryFn: async () => {
      if (!(SPEAKER_ROLE in roles)) {
        return null
      }

      return useGetMyWorks()
    },
    enabled: !!roles,
  })
}
