import { EVENTS_URL } from "@/lib/Constants";
import { getEventId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetRegisterData(userId) {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getRegisterData", { userId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return mockUserRegistration;
    },
  });
}

export function useGetPayments(userId) {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getPayments", { userId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return mockPaymentsList;
    },
  });
}

const mockUserRegistration = {
  role: "Asistente",
  name: "John Doe",
  affiliation: "FIUBA",
  file: null,
};

const mockPaymentsList = [
  {
    id: 1,
    date: new Date(2023, 5, 15),
    status: "Confirmado",
    name: "Presentador: descuento de profesores FIUBA",
    amount: 150,
    works: [
      { id: 1, title: "Advancements in Quantum Computing" },
      { id: 2, title: "AI in Healthcare: A Comprehensive Review" },
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
