import axios from "axios";
import {generateHeaders} from "@/lib/utils.js";
import {EVENTS_URL} from "@/lib/Constants.js";

export const apiUploadFile = async (uploadInfo, file) => {
    const headers = {
        'Content-Type': 'application/octet-stream'
    };
    try {
        return await axios.put(uploadInfo.upload_url, file,{ headers: headers } );
    } catch (err) {
        console.log("Error subiendo el archivo al storage: ", err);
        throw err;
    }
}

export const getUploadUrl = async (eventId)  => {
    try {
        const headers = generateHeaders();
        const url = `${EVENTS_URL}/${eventId}/upload_url/main_image`;
        const res = await axios.get(url, { headers: headers });
        console.log(res.data)
        return res.data;
    } catch (err) {
        console.log("Error en obtener upload url desde el backend: ", err);
        throw err;
    }
}



