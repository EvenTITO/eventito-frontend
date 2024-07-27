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

export const apiGetEventPublicById = async (eventId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/public`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error for get event", err);
        throw err;
    }
}

export const apiGetEventFor = async (finalUrl) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${finalUrl}`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log(`Error for url: ${url}`);
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

export const apiPutEventGeneral = async (eventId, eventObject) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/configuration/general`;
        const reqBody = {
            "title": eventObject.title,
            "description": eventObject.description,
            "event_type": eventObject.event_type,
            "start_date": eventObject.start_date,
            "end_date": eventObject.end_date,
            "location": eventObject.location,
            "tracks": eventObject.tracks,   
            "contact": eventObject.contact,
            "organized_by": eventObject.organized_by,
            "notification_mails": eventObject.notification_mails
          }
        
        return await axios.put(url, reqBody, {headers: headers});
    } catch (err) {
        console.log("Error to change event state", err);
        throw err;
    }
}

export const apiPutEventFor= async (finalUrl, eventBody) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${finalUrl}`;
        
        return await axios.put(url, eventBody, {headers: headers});
    } catch (err) {
        console.log("Error to change event state", err);
        throw err;
    }
}