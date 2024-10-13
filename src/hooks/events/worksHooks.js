import { SPEAKER_ROLE } from '@/lib/Constants'
import { getEventId, getWorkId } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import {
  apiGetSubmissionsForWork,
  apiGetWorkById,
  apiGetWorkDownloadURL,
  apiGetWorksWithTalk,
} from '@/services/api/works/queries'
import { convertWork, convertWorks } from '@/services/api/works/conversor'
import { useGetMyWorks } from './authorHooks'
import { useGetReviewersForWork, useGetReviewsForWork } from './chairHooks'
import { useToastMutation } from '@/hooks/use-toast-mutation.js'

export function useGetWorkInfo() {
  const workInfo = useGetWorkById()
  const reviews = useGetReviewsForWork()
  const reviewers = useGetReviewersForWork()

  return {
    workInfo: workInfo.data,
    reviews: reviews.data,
    reviewers: reviewers.data,
    isPending: workInfo.isPending || reviews.isPending || reviewers.isPending,
    error: workInfo.error || reviews.error || reviewers.error,
  }
}

export function useGetWorkById() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getWorkById', { workId }],
    queryFn: async () => await getWorkById(eventId, workId),
  })
}

export const getWorkById = async (eventId, workId) => {
  const work = await apiGetWorkById(eventId, workId)
  const submissions = await apiGetSubmissionsForWork(eventId, workId)
  return convertWork(work, submissions)
}

export function useGetWorkDownloadURL() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useToastMutation(
    async () => {
      return await apiGetWorkDownloadURL(eventId, workId)
    },
    {
      onSuccess: (fileData) => {
        window.open(fileData.download_url.download_url, '_blank')
      },
    },
    {
      serviceCode: 'WORK_DOWNLOAD_URL',
      successShow: false,
    }
  )
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

export function useGetWorksWithTalk() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getWorksWithTalk', { eventId }],
    queryFn: async () => {
      const worksWithTalk = await apiGetWorksWithTalk(eventId)
      return convertWorks(worksWithTalk)
    },
  })
}
