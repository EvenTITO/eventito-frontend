import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";
import { z } from "zod";

const httpClient = new HTTPClient(EVENTS_URL);

const uuidSchema = z.string().uuid();

export const apiGetEventById = async (eventId) => {
  try {
    return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data;
  } catch (err) {
    throw err;
  }
};

export const apiGetMyEvents = async () => {
  try {
    return (await httpClient.get("/my-events")).data;
  } catch (err) {
    throw err;
  }
};
