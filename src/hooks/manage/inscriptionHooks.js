import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  apiGetInscriptions,
  apiGetPayments,
  apiUpdateInscriptionStatus,
} from '@/services/api/events/inscriptions/queries.js'
import { convertInscriptions } from '@/services/api/events/inscriptions/conversor.js'
import { useToastMutation } from '../use-toast-mutation'

export function useGetInscriptions() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getInscriptions', { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const inscriptions = await apiGetInscriptions(httpClient, eventId)
      const payments = await apiGetPayments(httpClient, eventId)
      return convertInscriptions(inscriptions, payments)
    },
  })
}

export function useUpdateInscriptionStatus() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useToastMutation(
    async ({ inscriptionId, newStatus }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const update = {
        status: newStatus,
      }
      await apiUpdateInscriptionStatus(
        httpClient,
        eventId,
        inscriptionId,
        update
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getInscriptions', { eventId }],
        })
      },
    },
    {
      success: {
        message: 'Inscripción actualizada con éxito',
      },
      error: {
        message: 'Error al actualizar la inscripción',
      },
    }
  )
}
