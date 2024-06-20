import axios from "axios";
import {EVENTS_URL} from "@/lib/Constants";
import {generateHeaders} from "@/lib/utils.js";

export const apiGetOrganizersByEventId = async (eventId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/organizers`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos con estado: "+status, err);
        throw err;
    }
}
