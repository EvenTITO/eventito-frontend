import axios from "axios";
import { USERS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";

const httpClient = new HTTPClient(USERS_URL);

export const apiGetUser = async (userId) => {
  const httpClient = new HTTPClient(USERS_URL);

  console.log("user en get", userId);
  const response = await httpClient.get(`/${userId}`);
  const { name, lastname, email, role } = response.data;
  return {
    id: userId,
    name: name,
    lastname: lastname,
    email: email,
    role: role,
  };
};

export const apiPostUser = async (userId, name, lastname, email) => {
  const httpClient = new HTTPClient(USERS_URL);

  const requestBody = {
    name: name,
    lastname:
      lastname === null || lastname === undefined || lastname === ""
        ? "Apellido"
        : lastname,
    email: email,
  };
  console.log("user en post", requestBody);
  return await httpClient.post("", requestBody);
};

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
};

export const apiPatchUserRole = async (userId, role) => {
  try {
    const headers = generateHeaders();
    const url = `${USERS_URL}/${userId}/roles`;
    const requestBody = {
      role: role,
    };
    return await axios.patch(url, requestBody, { headers: headers });
  } catch (err) {
    console.log("Error cambiando rol de un usuario: ", err);
    throw err;
  }
};
