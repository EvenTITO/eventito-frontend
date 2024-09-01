import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { z } from "zod";

const httpClient = new HTTPClient(EVENTS_URL);

const uuidSchema = z.string().uuid();

export const apiGetEventById = async (eventId) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data;
};

export const apiGetMyEvents = async () => {
  return (await httpClient.get("/my-events")).data;
};

export const apiGetAllEvents = async (httpClient) => {
  return (await httpClient.get("/")).data;
}
