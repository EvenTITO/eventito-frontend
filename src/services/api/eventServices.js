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
        console.log("Error en obtener los eventos con estado: "+status, err);
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
        console.log("Error cambiando estado del evento: ", err);
        throw err;
    }
}

export const apiGetEventById = async (eventId) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos con estado: "+status, err);
        throw err;
    }
}

export const apiGetEventsByUserOrganizer = async (userId) => {
    try {
        const headers = generateHeaders();
        //TODO esta mal pedir al back eventos y que el path sea /users
        const url = `${USERS_URL}/${userId}/organized-events`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos con estado: "+status, err);
        throw err;
    }
}

export const apiGetPublicEvents = async () => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}`;
        const res = await axios.get(url, {headers: headers});
        return res.data;
    } catch (err) {
        console.log("Error en obtener los eventos con estado: "+status, err);
        throw err;
    }
}

export const apiPostEvent = async (event) => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}`;
        console.log(event);
        const response = await axios.post(url, event, {headers: headers});
        console.log(response);
    } catch (err) {
        console.log("Error creando evento: ", err);
        throw err;
    }
}
