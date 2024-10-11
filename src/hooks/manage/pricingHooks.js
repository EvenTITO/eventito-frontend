import { getEventId } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  apiUpdateDatesEvent,
  apiUpdatePricingEvent,
} from '@/services/api/events/general/queries.js'
import {
  convertNewDates,
  convertNewPricing,
  convertUpdatePricing,
  convertFares,
} from '@/services/api/events/general/conversor.js'

export function useAddOrModifyFareInEventPricing() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      newFare,
      eventPrices,
      eventDates,
      relatedDate = undefined,
    }) => {
      if (relatedDate) {
        if (eventDates.some((d) => d.name === relatedDate.name)) {
          newFare.relatedDate = relatedDate.name
        } else {
          const updatedDates = convertNewDates(eventDates, relatedDate)
          await apiUpdateDatesEvent(eventId, updatedDates)
        }
      }

      let updatedPricing
      if (eventPrices.some((fare) => fare.name === newFare.name)) {
        updatedPricing = convertUpdatePricing(eventPrices, newFare)
      } else {
        updatedPricing = convertNewPricing(eventPrices, newFare)
      }
      return await apiUpdatePricingEvent(eventId, updatedPricing)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useDeletePayment() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ fareName, eventPricing }) => {
      const updatedFares = eventPricing.filter((p) => p.name !== fareName)
      const faresConverted = convertFares(updatedFares)
      return await apiUpdatePricingEvent(eventId, faresConverted)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}
