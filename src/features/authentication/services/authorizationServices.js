import { apiGetUser, apiPostUser } from "@/services/api/userServices";
import {
	firebaseLogOut,
	firebaseLogin,
	firebaseLoginWithGoogle,
	firebaseSignUp,
	firebaseSignUpWithGoogle
} from "@/services/firebase/firebaseServices";

export const login = async (userData) => {
	let user;
	try {
		user = await firebaseLogin(userData);
	} catch (exception) {
		exception.source = 'Firebase';
		throw exception;
	}

	return await getUser(user.uid);
};

export const loginWithGoogle = async () => {
	try {
		const user = await firebaseLoginWithGoogle();
		const userObtained = await apiGetUser(user.uid);
		return userObtained;
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
};

export const logOut = async () => {
	await firebaseLogOut();
};

export const signUpWithGoogle = async () => {
	try {
		return await firebaseSignUpWithGoogle();
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
}

export const signUpFirebase = async (userData) => {
	try {
		return await firebaseSignUp(userData);
	} catch (exception) {
		exception.source = 'Firebase';
		throw exception;
	}
};

export const signUpAPI = async (userData) => {
	console.log(`Pegandolo a API para crear user: ${userData.uid}`);
	const res = apiPostUser(
		userData.uid,
		userData.name,
		userData.lastname,
		userData.email
	)

	if (res.error) {
		await logOut();
		console.log(res.error);
	} else {
		console.log(`Haciendole get a API para crear user: ${userData.uid}`);
		return await getUser(
			userData.uid
		);
	}
};

export const getUser = async (userId) => {
	console.log(`Haciendole get a API: ${userId}`);
	try {
		return await apiGetUser(userId);
	} catch (exception) {
		exception.idUser = userId;
		exception.source = 'API';
		throw exception;
	}
};
