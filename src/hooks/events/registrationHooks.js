import { getEventId, wait } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSubmitRegistration() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ registrationData }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventById"],
      });
    },
  });
}
