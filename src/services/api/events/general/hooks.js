/*
 *  Custom hooks to consume from the events API
 * */

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiGetAllEvents,
  apiGetEventById,
  apiGetMyEvents,
  apiPostCreateEvent,
} from "./queries";
import { convertEventsData, convertMyEventsData } from "./conversor";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { constructCreateEventBody } from "./constructors";

export function getPublicEvents() {
  return useQuery({
    queryKey: ["getPublicEvents"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetAllEvents(httpClient);
      return convertEventsData(eventData);
    },
  });
}

export function getMyEvents() {
  return useQuery({
    queryKey: ["getMyEvents"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetMyEvents(httpClient);
      return convertMyEventsData(eventData);
    },
  });
}

export function getEvent(eventId) {
  return useQuery({
    queryKey: ["getEvent", {eventId}],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const eventData = await apiGetEventById(httpClient, eventId);
      return eventData;
    },
  });
}

export function createEvent() {
  return useMutation({
    mutationFn: async (eventData) => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const body = constructCreateEventBody(eventData);
      return await apiPostCreateEvent(httpClient, body);
    },
    onSuccess: (data) => {
      console.log("Event created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating event:", error);
    },
  });
}
