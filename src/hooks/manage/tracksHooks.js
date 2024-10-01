import { EVENTS_URL } from '@/lib/Constants'
import { getEventId } from '@/lib/utils'
import { HTTPClient } from '@/services/api/HTTPClient'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  convertEventChair,
  convertEventChairs,
  convertEventChairsByTracks,
} from '@/services/api/events/chair/conversor.js'
import {
  apiGetEventChair,
  apiGetEventChairs,
  apiUpdateChairTracks,
  apiUpdateTracks,
} from '@/services/api/events/chair/queries.js'

export function useAddTrack() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventTracks, track }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const newTracks = [...eventTracks, track]
      return await apiUpdateTracks(httpClient, eventId, { tracks: newTracks })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventChairs', { eventId }],
      })
    },
  })
}

export function useGetEventChair(userId) {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getEventChair', { eventId, userId }],
    queryFn: async () => {
      const chair = await getEventChair(eventId, userId)
      return convertEventChair(chair)
    },
  })
}

export function useGetEventChairs() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getEventChairs', { eventId }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId)
      return convertEventChairs(chairs)
    },
  })
}

export function useGetEventChairsByTrack(track) {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getEventChairsByTrack', { eventId, track }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId)
      return convertEventChairs(chairs, track)
    },
  })
}

export function useGetEventChairsByTracks() {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getEventChairsByTracks', { eventId }],
    queryFn: async () => {
      const chairs = await getEventChairs(eventId)
      return convertEventChairsByTracks(chairs)
    },
  })
}

// ... previous imports and hooks remain the same

export function useAddChairToTrack() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ track, userId }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const chair = await queryClient.ensureQueryData({
        queryKey: ['getEventChair', { eventId, userId }],
        queryFn: async () => await getEventChair(eventId, userId),
      })
      const newTracks = [...chair.tracks, track]
      return await apiUpdateChairTracks(httpClient, eventId, userId, {
        tracks: newTracks,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventChairs', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventChairsByTrack', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventChairsByTracks', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useDeleteChairOfTrack() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ track, userId }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const chair = await queryClient.ensureQueryData({
        queryKey: ['getEventChair', { eventId, userId }],
        queryFn: async () => await getEventChair(eventId, userId),
      })
      const newTracks = [...chair.tracks.filter((t) => t !== track)]
      return await apiUpdateChairTracks(httpClient, eventId, userId, {
        tracks: newTracks,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventChairs', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventChairsByTrack', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventChairsByTracks', { eventId }],
      })
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

async function getEventChairs(eventId) {
  const httpClient = new HTTPClient(EVENTS_URL)
  return await apiGetEventChairs(httpClient, eventId)
}

async function getEventChair(eventId, userId) {
  const httpClient = new HTTPClient(EVENTS_URL)
  return await apiGetEventChair(httpClient, eventId, userId)
}
