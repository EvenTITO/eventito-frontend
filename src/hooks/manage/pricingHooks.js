import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPClient } from "@/services/api/HTTPClient.js";
import { EVENTS_URL } from "@/lib/Constants.js";
import {
  apiUpdateDatesEvent,
  apiUpdatePricingEvent,
} from "@/services/api/events/general/queries.js";
import { useGetEvent } from "@/hooks/events/useEventState.js";
import {
  convertNewDates,
  convertNewPricing,
  convertUpdatePricing,
  convertFares,
} from "@/services/api/events/general/conversor.js";

export function useAddOrModifyFareInEventPricing() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      newFare,
      eventPrices,
      eventDates,
      relatedDate = undefined,
    }) => {
      const httpClient = new HTTPClient(EVENTS_URL);

      if (relatedDate) {
        if (eventDates.some((d) => d.name === relatedDate.name)) {
          newFare.relatedDate = relatedDate.name;
        } else {
          const updatedDates = convertNewDates(eventDates, relatedDate);
          await apiUpdateDatesEvent(httpClient, eventId, updatedDates);
        }
      }

      let updatedPricing;
      if (eventPrices.some((fare) => fare.name === newFare.name)) {
        updatedPricing = convertUpdatePricing(eventPrices, newFare);
      } else {
        updatedPricing = convertNewPricing(eventPrices, newFare);
      }
      return await apiUpdatePricingEvent(httpClient, eventId, updatedPricing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useDeletePayment() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fareName, eventPricing }) => {
      const httpClient = new HTTPClient(EVENTS_URL);

      const updatedFares = eventPricing.filter((p) => p.name !== fareName);
      console.log(fareName, updatedFares)
      const faresConverted = convertFares(updatedFares);
      return await apiUpdatePricingEvent(httpClient, eventId, faresConverted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
