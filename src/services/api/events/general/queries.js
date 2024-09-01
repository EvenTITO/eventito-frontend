import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { z } from "zod";

const uuidSchema = z.string().uuid();

export const apiGetEventById = async (eventId, httpClient) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data;
};

export const apiGetMyEvents = async (httpClient) => {
  return (await httpClient.get("/my-events")).data;
};
