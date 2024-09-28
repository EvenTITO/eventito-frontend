import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddPayment() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentData,
      eventPricing,
      paymentDeadlineDate,
      paymentRole,
    }) => {
      // campos que dejo CON ESTOS MISMOS NOMBRES EN SU CONTENIDO:
      //
      // paymentData: nueva tarifa con name, description, value y needVerification
      // eventPricing: lista actual de precios del evento (sin paymentData)
      // paymentDeadlineDate: nueva fecha a agregar con name y date
      // paymentRole: si es de ATTENDEE o AUTHOR (si quiere agregar las dos la llamo 2 veces)
      //  - por ahora lo pueden dejar en la descripción, lo ideal sería vincularselo al nombre
      //    de la tarifa del tipo "role:nombre" -> lo desencodeamos cuando la traemos.
      //  - no es necesario para ahora, pero para después es importante mostrar las tarifas
      //    solo del rol del tipo.
      //
      //  Del eventPricing + paymentData (con todos los otros chiches), si le hacen
      //  un set dado por el name de la tarifa entonces para modificar el payment llamo a esta función.
      //  En ese caso podríamos cambiarle el nombre a useAddOrModifyPayment.

      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentName }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}
