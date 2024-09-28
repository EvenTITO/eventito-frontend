import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, wait } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetChairsByTracks() {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getEventChairsByTracks", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return convertEventMembers(eventMembers);
    },
  });
}

export function useAddChairToTrack() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ track, chairEmail }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
    },
  });
}

export function useDeleteChairOfTrack() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ track, chairEmail }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
    },
  });
}

export function useChangeChairOfTrack() {
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ track, newChairEmail }) => {
      await wait(2);
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
    },
  });
}

const chairsByTracks = [
  {
    track: "track 1",
    chair: "gsabatino@fi.uba.ar",
  },
  {
    track: "track 2",
    chair: "mcapon@fi.uba.ar",
  },
  {
    track: "track 3",
    chair: "fsinisi@fi.uba.ar",
  },
  {
    track: "track 4",
    chair: "lveron@fi.uba.ar",
  },
  {
    track: "track 5",
    chair: "mcapon@fi.uba.ar",
  },
];
