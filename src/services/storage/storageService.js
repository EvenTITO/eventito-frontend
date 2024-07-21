import axios from "axios";
import {generateHeaders} from "@/lib/utils.js";
import {EVENTS_URL} from "@/lib/Constants.js";

export const apiUploadFile = async (uploadUrl, file) => {
    const headers = {
        'Content-Type': 'application/octet-stream'
    };
    try {
        return await axios.put(uploadUrl, file,{ headers: headers } );
    } catch (err) {
        console.log("Error subiendo el archivo al storage: ", err);
        throw err;
    }
}

export const getUploadUrl = async (eventId, fileName)  => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/upload_url/${fileName}`;
        const res = await axios.get(url, { headers: headers });
        return res.data;
    } catch (err) {
        console.log("Error en obtener upload url desde el backend: ", err);
        throw err;
    }
}



