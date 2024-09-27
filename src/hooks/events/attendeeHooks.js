import {EVENTS_URL} from "@/lib/Constants";
import {getEventId} from "@/lib/utils";
import {HTTPClient} from "@/services/api/HTTPClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGetInscriptions, apiUpdateInscription} from "@/services/api/events/inscriptions/queries.js";
import {convertInscriptions} from "@/services/api/events/inscriptions/conversor.js";
import {uploadFile} from "@/services/api/storage/queries.js";

export function useGetInscription() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getInscriptions", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const inscriptions = await apiGetInscriptions(httpClient, eventId);
      return convertInscriptions(inscriptions);
    },
    onError: (error) => {
      console.error(error);
    }
  });
}

export function useGetPayments() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getPayments", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return mockPaymentsList;
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
      queryClient.invalidateQueries({queryKey: ["getInscriptions", {eventId}]});
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
      queryClient.invalidateQueries({queryKey: ["getPayments"]});
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
