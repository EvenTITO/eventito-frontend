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

export const signUp = async (userData) => {
	try {
		return await firebaseSignUp(userData);
	} catch (exception) {
		exception.source = 'Firebase';
		throw exception;
	}
};

export const completeRegister = async (userData) => {
	return apiPostUser(
		userData.uid,
		userData.name,
		userData.lastname,
		userData.email
	)
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
