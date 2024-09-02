import { z } from "zod";

const uuidSchema = z.string().uuid();

export const apiGetEventById = async (eventId, httpClient) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data;
};

export const apiGetMyEvents = async (httpClient) => {
  return (await httpClient.get("/my-events")).data;
};

export const apiGetAllEvents = async (httpClient) => {
  return (await httpClient.get("/")).data;
};
