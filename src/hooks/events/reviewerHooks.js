import { getEventId, getWorkId } from '@/lib/utils'
import {
  apiGetAssignments,
  apiPostReview,
} from '@/services/api/events/reviewer/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  convertAssignments,
  convertReviewToReviewBody,
} from '@/services/api/events/reviewer/conversor.js'

export function useGetMyAssignments() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getMyAssignments', { eventId }],
    queryFn: async () => {
      const assignments = await apiGetAssignments(eventId)
      return convertAssignments(assignments)
    },
  })
}

export function useSubmitReview() {
  const workId = getWorkId()
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ review }) => {
      const reviewBody = convertReviewToReviewBody(review)
      return await apiPostReview(eventId, workId, reviewBody)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getMyAssignments', { eventId }],
      })
    },
  })
}
