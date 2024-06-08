import { apiGetUser, apiPostUser } from "@/services/api/userServices";
import { firebaseLogOut, firebaseLogin, firebaseLoginWithGoogle, firebaseSignUp } from "@/services/firebase/firebaseServices";

export const login = async (userData) => {
	try {
		const user = await firebaseLogin(userData);
		const userObtained = await apiGetUser(user.uid);
		return userObtained;
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
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

export const signUp = async (userData) => {
	try {
		const user = await firebaseSignUp(userData);
		const res = apiPostUser(user.uid, userData.name, null);

		if (res.error) {
			await logOut();
			alert(res.error);
		}
		return res;
	} catch (exception) {
		throw exception;
	}
};

