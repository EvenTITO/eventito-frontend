import {getEventId, wait} from "@/lib/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HTTPClient} from "@/services/api/HTTPClient.js";
import {EVENTS_URL} from "@/lib/Constants.js";
import {apiUpdateDatesEvent, apiUpdatePricingEvent} from "@/services/api/events/general/queries.js";
import {useGetEvent} from "@/hooks/events/useEventState.js";
import {convertNewDates, convertNewPricing, convertUpdatePricing, convertFares } from "@/services/api/events/general/conversor.js";

export function useAddOrModifyFareInEventPricing() {
  const eventId = getEventId();
  const {data: event} = useGetEvent(eventId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({newFare, relatedDate = undefined}) => {
      const pricing = event.pricing;
      const dates = event.dates;
      const httpClient = new HTTPClient(EVENTS_URL);

      if (relatedDate) {
        if (dates.some(d => d.name === relatedDate.name)) {
          newFare.relatedDate = relatedDate.name;
        } else {
          const updatedDates = convertNewDates(dates, relatedDate);
          await apiUpdateDatesEvent(httpClient, eventId, updatedDates)
        }
      }

      let updatedPricing;
      if (pricing.some(fare => fare.name === newFare.name)) {
        updatedPricing = convertUpdatePricing(pricing, newFare)
      } else {
        updatedPricing = convertNewPricing(pricing, newFare);
      }
      return await apiUpdatePricingEvent(httpClient, eventId, updatedPricing)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", {eventId}],
      });
    },
  });
}

export function useDeletePayment() {
  const eventId = getEventId()
  const {data: event} = useGetEvent(eventId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({fareName}) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const pricing = event.pricing

      const updatedFares = pricing.filter(
        (p) => p.name !== fareName,
      )
      const faresConverted = convertFares(updatedFares)
      return await apiUpdatePricingEvent(httpClient, eventId, faresConverted) 
    }, onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", {eventId}],
      })
    },
  });
}
