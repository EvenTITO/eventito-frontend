import { getEventId, getWorkId } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  apiGetMyWorks,
  apiGetSubmissionUploadUrl,
  apiPostWork,
  apiPutWork,
} from '@/services/api/works/queries'
import { convertWorks } from '@/services/api/works/conversor'
import { getWorkById } from '@/hooks/events/worksHooks'
import { uploadFile } from '@/services/api/storage/queries'
import { getInscriptionWithPayments } from '@/hooks/events/attendeeHooks'
import { useToastMutation } from '@/hooks/use-toast-mutation.js'

export function useGetMyWorks() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getMyWorks', { eventId }],
    queryFn: async () => {
      const myWorks = await apiGetMyWorks(eventId)
      return convertWorks(myWorks)
    },
  })
}

export function useNewWork() {
  const eventId = getEventId()
  const { currentUser } = useSelector((state) => state.user)
  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ workData }) => {
      const inscription = await queryClient.ensureQueryData({
        queryKey: ['getMyInscription', { eventId }],
        queryFn: async () => await getInscriptionWithPayments(eventId),
      })
      const work = {
        abstract: workData.abstract,
        title: workData.title,
        track: workData.track,
        keywords: workData.keywords.split(','),
        authors: [
          {
            full_name: currentUser.fullname,
            membership: inscription.affiliation,
            mail: currentUser.email,
            notify_updates: true,
            is_speaker: true,
            is_main: true,
          },
        ],
      }
      const workId = await apiPostWork(eventId, work)
      await uploadSubmissionFile(eventId, workId, workData.pdfFile)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getMyWorks'],
        })
      },
    },
    {
      serviceCode: 'CREATE_WORK',
    }
  )
}

async function uploadSubmissionFile(eventId, workId, file) {
  if (!file) {
    console.log('No submission file given')
    return
  }
  const uploadUrl = await apiGetSubmissionUploadUrl(eventId, workId)
  await uploadFile(uploadUrl.upload_url, file)
}

export function useEditWork() {
  const eventId = getEventId()
  const workId = getWorkId()

  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ workData }) => {
      const work = await queryClient.ensureQueryData({
        queryKey: ['getWorkById', { workId }],
        queryFn: async () => await getWorkById(eventId, workId),
      })

      const workUpdate = {
        ...workData,
        keywords:
          work.keywords !== undefined ? workData.keywords.split(',') : [],
        authors: work.authors,
      }
      await apiPutWork(eventId, workId, workUpdate)
      await uploadSubmissionFile(eventId, workId, workData.file)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getWorkById', { workId }],
        })
      },
    },
    {
      serviceCode: 'EDIT_WORK',
    }
  )
}

export function useAddAuthorToWork() {
  const eventId = getEventId()
  const workId = getWorkId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ authorData }) => {
      const work = await queryClient.ensureQueryData({
        queryKey: ['getWorkById', { workId }],
        queryFn: async () => await getWorkById(eventId, workId),
      })

      const workUpdate = {
        ...work,
        authors: [
          ...work.authors,
          {
            full_name: authorData.fullname,
            membership: authorData.affiliation,
            mail: authorData.email,
            notify_updates: authorData.notifyAuthor,
            is_speaker: authorData.isSpeaker,
            is_main: false,
          },
        ],
      }
      await apiPutWork(eventId, workId, workUpdate)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getWorkById', { workId }],
      })
    },
  })
}
