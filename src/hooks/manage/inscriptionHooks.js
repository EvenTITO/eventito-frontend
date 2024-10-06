import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  apiGetInscriptions,
  apiGetPayments,
  apiUpdateInscriptionStatus,
  apiUpdatePaymentStatus,
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

export function createUseUpdateStatus(updateFunction, idName) {
  return function useUpdateStatus() {
    const eventId = getEventId()
    const queryClient = useQueryClient()

    return useToastMutation(
      async ({ [idName]: id, newStatus }) => {
        const httpClient = new HTTPClient(EVENTS_URL)
        const update = {
          status: newStatus,
        }
        await updateFunction(httpClient, eventId, id, update)
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
          show: true,
          title: 'Inscripción actualizada',
          message: 'Se actualizó la inscripción de forma correcta',
        },
        error: {
          title: 'Inscripción no actualizada',
          message: 'Ocurrió un error al actualizar la inscripción',
        },
      }
    )
  }
}

export const useUpdateInscriptionStatus = createUseUpdateStatus(
  apiUpdateInscriptionStatus,
  'inscriptionId'
)

export const useUpdatePaymentStatus = createUseUpdateStatus(
  apiUpdatePaymentStatus,
  'paymentId'
)
