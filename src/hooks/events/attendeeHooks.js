import {EVENTS_URL} from "@/lib/Constants";
import {getEventId, getInscriptionId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  apiGetInscriptionPayments,
  apiGetMyInscriptions,
  apiPutInscriptionPayment,
  apiSubmitInscription,
  apiUpdateInscription,
} from "@/services/api/events/inscriptions/queries.js";
import {convertInscription} from "@/services/api/events/inscriptions/conversor.js";
import {uploadFile} from "@/services/api/storage/queries.js";

export function useGetMyInscription() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getMyInscription", {eventId}],
    queryFn: async () => await getInscriptionWithPayments(eventId),
    onError: (e) => {
      console.error(JSON.stringify(e));
    },
  });
}

export function useSubmitInscription() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({inscriptionData}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const res = await apiSubmitInscription(
        httpClient,
        eventId,
        inscriptionData,
      );
      await uploadFile(res.data.upload_url, inscriptionData.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyInscription", {eventId}],
      });
    },
    onError: (e) => {
      console.error(JSON.stringify(e));
    },
  });
}

export function useUpdateInscription() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({inscriptionId, newInscriptionData}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const res = await apiUpdateInscription(
        httpClient,
        eventId,
        inscriptionId,
        newInscriptionData,
      );
      await uploadFile(res.data.upload_url, newInscriptionData.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyInscription", {eventId}],
      });
    },
    onError: (e) => {
      console.error(JSON.stringify(e));
    },
  });
}

export function useNewPayment() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({paymentData}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const inscription = await queryClient.ensureQueryData({
        queryKey: ["getMyInscription", {eventId}],
        queryFn: async () => await getInscriptionWithPayments(eventId)
      })
      const res = await apiPutInscriptionPayment(
        httpClient,
        eventId,
        inscription.id,
        paymentData,
      );
      await uploadFile(res.data.upload_url, paymentData.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getMyInscription", {eventId}],
      });
    },
    onError:
      (e) => {
        console.error(JSON.stringify(e));
      },
  });
}

export async function getInscriptionWithPayments(eventId) {
  const httpClient = new HTTPClient(EVENTS_URL);
  const inscription = await apiGetMyInscriptions(httpClient, eventId);
  const payments = await apiGetInscriptionPayments(
    httpClient,
    eventId,
    inscription.id,
  );
  return convertInscription(inscription, payments);
}
