import { z } from "zod";

const uuidSchema = z.string().uuid();

export const apiGetEventById = async (httpClient, eventId) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data;
};

export const apiGetMyEvents = async (httpClient) => {
  return (await httpClient.get("/my-events")).data;
};

export const apiGetAllEvents = async (httpClient) => {
  return (await httpClient.get("/")).data;
};

export const apiPostCreateEvent = async (httpClient, body) => {
  return (await httpClient.post("", body));
};
