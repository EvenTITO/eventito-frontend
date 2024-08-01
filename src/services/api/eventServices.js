import axios from "axios";
import {EVENTS_URL, USERS_URL} from "@/lib/Constants";
import {generateHeaders} from "@/lib/utils.js";

export const apiGetEventsByStatus = async (status) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/?offset=0&limit=100&status=${status}`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos con estado: " + status, err);
        throw err;
    }
}

export const apiPatchEventStatus = async (eventId, status) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/status`;
        const requestBody = {
            status: status
        };
        return await axios.patch(url, requestBody, {headers: headers});
    } catch (err) {
        console.log("Error cambiando estado del evento", err);
        throw err;
    }
}

export const apiGetEventById = async (eventId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/public`; //TODO revisar cambios con lucas
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener el evento", err);
        throw err;
    }
}

export const apiGetMyEvents = async () => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/my-events`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos del usuario:" + userId, err);
        throw err;
    }
}

export const apiPostEvent = async (event) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}`;
        await axios.post(url, event, {headers: headers});
    } catch (err) {
        console.log("Error creando evento", err);
        throw err;
    }
}

export const apiGetEventMembersByRole = async (eventId, role) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/${role}`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log(`Error en obtener los ${role} del evento`, err);
        throw err;
    }
}

export const apiGetEventConfigurationById = async (eventId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/configuration`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener la configuracion del evento", err);
        throw err;
    }
}

export const apiPutEventConfiguration = async (eventId, configName, body) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/configuration/${configName}`;
        await axios.put(url, body, {headers: headers});
    } catch (err) {
        console.log("Error editando evento", err);
        throw err;
    }
}

export const apiPostNewMemberToEvent = async (eventId, memberType, member) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/${memberType}`;
        await axios.post(url, member, {headers: headers});
    } catch (err) {
        console.log("Error enviando solicitud de miembro de evento", err);
        throw err;
    }
}

export const apiDeleteMemberToEvent = async (eventId, memberType, memberId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/${memberType}/${memberId}`;
        await axios.delete(url, {headers: headers});
    } catch (err) {
        console.log("Error eliminando miembro del evento", err);
        throw err;
    }
}
