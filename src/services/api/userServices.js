import axios from "axios";
import { USERS_URL } from "@/lib/Constants";
import { getAuthUser } from "@/services/firebase/firebaseServices";

const generateAuthorizationHeader = (token) => `Bearer ${token}`;

const generateHeaders = () => {
	return {
		'Content-Type': 'application/json',
		'accept': 'application/json',
		'Authorization': generateAuthorizationHeader(
			getAuthUser().stsTokenManager.accessToken
		)
	};
};

export const apiGetUser = async (userId) => {
	try {
		const headers = generateHeaders();
		const url = `${USERS_URL}/${userId}`;
		const res = await axios.get(url, {
			headers: headers,
		});

		const { name, lastname, email } = res.data;
		return {
			id: userId,
			name: name,
			lastname: lastname,
			email: email
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
		const res = await axios.post(url, {
			requestBody,
			headers: headers
		});

		return res;
	} catch (err) {
		console.log("Error en createUser: ", err);
		throw err;
	}
}
