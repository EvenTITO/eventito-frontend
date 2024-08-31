import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient"

const httpClient = new HTTPClient(EVENTS_URL);


export const apiGetEventById = async (eventId) => {
    try {
        const url = `/${eventId}/public`;
        const res = await httpClient.get(url);
        return res.data;
    } catch (err) {
        console.log("Error en obtener el evento", err);
        throw err;
    }
}