/*
 *  Custom hooks to consume from the events API
 * */

import { useQuery } from '@tanstack/react-query'
import { apiGetAllEvents, apiGetMyEvents, apiPostCreateEvent } from './queries'
import { convertEventsData, convertMyEventsData } from './conversor'
import { constructCreateEventBody } from './constructors'
import { useToastMutation } from '@/hooks/use-toast-mutation'

export function getPublicEvents() {
  return useQuery({
    queryKey: ['getPublicEvents'],
    queryFn: async () => {
      const eventData = await apiGetAllEvents()
      return convertEventsData(eventData)
    },
  })
}

export function getMyEvents() {
  return useQuery({
    queryKey: ['getMyEvents'],
    queryFn: async () => {
      const eventData = await apiGetMyEvents()
      return convertMyEventsData(eventData)
    },
  })
}

export function createEvent() {
  return useToastMutation(
    async (eventData) => {
      const body = constructCreateEventBody(eventData)
      return await apiPostCreateEvent(body)
    },
    {
      onSuccess: (data) => {
        console.log('Event created successfully:', data)
      },
      onError: (error) => {
        console.error('Error creating event:', error)
      },
    },
    {
      serviceCode: 'CREATE_EVENT',
      successShow: false,
    }
  )
}
