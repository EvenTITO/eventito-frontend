import {
	firebaseLogOut,
	firebaseLogin,
	firebaseLoginWithGoogle,
	firebaseSendResetPassword,
	firebaseSignUp,
	firebaseSignUpWithGoogle
} from "@/services/firebase/firebaseServices";

export const login = async (userData) => {
	try {
		return await firebaseLogin(userData);
	} catch (exception) {
		exception.source = 'Firebase';
		throw exception;
	}
};

export const loginWithGoogle = async () => {
	try {
		return await firebaseLoginWithGoogle();
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
}
