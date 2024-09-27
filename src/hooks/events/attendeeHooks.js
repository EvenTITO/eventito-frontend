import {EVENTS_URL} from "@/lib/Constants";
import {getEventId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
  apiGetInscriptionPayments,
  apiGetMyInscriptions,
  apiSubmitInscription,
  apiUpdateInscription
} from "@/services/api/events/inscriptions/queries.js";
import {convertInscription} from "@/services/api/events/inscriptions/conversor.js";
import {uploadFile} from "@/services/api/storage/queries.js";

export function useGetMyInscription() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getMyInscription", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const inscription = await apiGetMyInscriptions(httpClient, eventId);
      console.log("myInscription:", inscription)
      const payments = await apiGetInscriptionPayments(httpClient, eventId, inscription.id);
      console.log("payments:", payments)
      return convertInscription(inscription, payments);
    },
    onError: (error) => {
      console.error("error:", error);
    }
  });
}

export function useSubmitInscription() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({inscriptionData}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const res = await apiSubmitInscription(httpClient, eventId, inscriptionData);
      await uploadFile(res.data.upload_url, inscriptionData.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getMyInscription", {eventId}]});
    },
    onError: (e) => {
      console.error(JSON.stringify(e))
    },
  });
}


export function useUpdateInscription() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({inscriptionId, newInscriptionData}) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const res = await apiUpdateInscription(httpClient, eventId, inscriptionId, newInscriptionData);
      await uploadFile(res.data.upload_url, newInscriptionData.file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getMyInscription", {eventId}]});
    },
    onError: (e) => {
      console.error(JSON.stringify(e))
    },
  });
}

export function useNewPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({userId, paymentData}) => {
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["getMyInscription"]});
    },
  });
}

const mockPaymentsList = [
  {
    id: 1,
    date: new Date(2023, 5, 15),
    status: "Confirmado",
    name: "Presentador: descuento de profesores FIUBA",
    amount: 150,
    works: [
      {id: 1, title: "Advancements in Quantum Computing"},
      {id: 2, title: "AI in Healthcare: A Comprehensive Review"},
    ],
  },
  {
    id: 2,
    date: new Date(2023, 5, 20),
    status: "Pendiente",
    name: "Asistente: descuento de profesores FIUBA",
    amount: 0,
    works: [],
  },
];
