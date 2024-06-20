import axios from "axios";
import { USERS_URL } from "@/lib/Constants";
import { generateHeaders } from "@/lib/utils.js";

export const apiGetUser = async (userId) => {
    try {
        const headers = generateHeaders();
        const url = `${USERS_URL}/${userId}`;
        const res = await axios.get(url, { headers: headers });
        const { name, lastname, email, role } = res.data;
        return {
            id: userId,
            name: name,
            lastname: lastname,
            email: email,
            role: role
        };
    } catch (err) {
        console.log("Error en login: ", err);
        throw err;
    }
}

export const apiPostUser = async (userId, name, lastname) => {
    try {
        const headers = generateHeaders();
        const url = `${USERS_URL}/${userId}`;

        const requestBody = {
            name: name,
            lastname: lastname === null || lastname === undefined || lastname === "" ? "Apellido" : lastname
        };
        return await axios.post(url, requestBody, { headers: headers });
    } catch (err) {
        console.log("Error en createUser: ", err);
        throw err;
    }
}

export const apiGetUsers = async () => {
    try {
        const headers = generateHeaders();
        const url = `${USERS_URL}`;
        const res = await axios.get(url, { headers: headers });
        return res.data;
    } catch (err) {
        console.log("Error en obtener todos los usuarios: ", err);
        throw err;
    }
}

export const apiPatchUserRole = async (userId, role) => {
    try {
        const headers = generateHeaders();
        const url = `${USERS_URL}/${userId}/roles`;
        const requestBody = {
            role: role
        };
        return await axios.patch(url, requestBody, { headers: headers });
    } catch (err) {
        console.log("Error cambiando rol de un usuario: ", err);
        throw err;
    }
}
