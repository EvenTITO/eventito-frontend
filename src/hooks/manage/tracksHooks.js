import { EVENTS_URL } from "@/lib/Constants";
import { getEventId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  convertEventChair,
  convertEventChairs,
  convertEventChairsByTracks,
} from "@/services/api/events/chair/conversor.js";
import {
  apiGetEventChair,
  apiGetEventChairs,
  apiUpdateChairTracks,
} from "@/services/api/events/chair/queries.js";

export function useGetEventChair(userId) {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getEventChair", { eventId, userId }],
    queryFn: async () => {
      const chair = await getEventChair(eventId, userId);
      return convertEventChair(chair);
    },
  });
}

export function useGetEventChairs() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getEventChairs", { eventId }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId);
      return convertEventChairs(chairs);
    },
  });
}

export function useGetEventChairsByTrack(track) {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getEventChairsByTrack", { eventId, track }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId);
      return convertEventChairs(chairs, track);
    },
  });
}

export function useGetEventChairsByTracks() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getEventChairsByTracks", { eventId }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId);
      return convertEventChairsByTracks(chairs);
    },
  });
}

export function useAddChairToTrack() {
  const eventId = getEventId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ track, userId }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const chair = await queryClient.ensureQueryData({
        queryKey: ["getEventChair", { eventId, userId }],
        queryFn: async () => await getEventChair(eventId, userId),
      });
      const newTracks = [...chair.tracks, track];
      return await apiUpdateChairTracks(httpClient, eventId, userId, {
        tracks: newTracks,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventChairs", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTrack", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventById", { eventId }],
      });
    },
  });
}

export function useDeleteChairOfTrack() {
  const eventId = getEventId();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ track, userId }) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const chair = await queryClient.ensureQueryData({
        queryKey: ["getEventChair", { eventId, userId }],
        queryFn: async () => await getEventChair(eventId, userId),
      });
      const newTracks = [...chair.tracks.filter((t) => t !== track)];
      return await apiUpdateChairTracks(httpClient, eventId, userId, {
        tracks: newTracks,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventChairs", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTrack", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
    },
  });
}

export function useChangeChairOfTrack() {
  const addChairToTrack = useAddChairToTrack();
  const deleteChairOfTrack = useDeleteChairOfTrack();
  return useMutation({
    mutationFn: async ({ track, fromUserId, toUserId }) => {
      await deleteChairOfTrack.mutateAsync({ track, userId: fromUserId });
      await addChairToTrack.mutateAsync({ track, userId: toUserId });
    },
    onSuccess: () => {
      const eventId = getEventId();
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({
        queryKey: ["getEventChairs", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTrack", { eventId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["getEventChairsByTracks", { eventId }],
      });
    },
  });
}

async function getEventChairs(eventId) {
  const httpClient = new HTTPClient(EVENTS_URL);
  return await apiGetEventChairs(httpClient, eventId);
}

async function getEventChair(eventId, userId) {
  const httpClient = new HTTPClient(EVENTS_URL);
  return await apiGetEventChair(httpClient, eventId, userId);
}
