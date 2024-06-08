import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from "firebase/auth";
import { auth } from "@/services/firebase/firebaseAuth";

export const getAuthUser = () => {
	return auth.currentUser;
}

export const firebaseLogin = async (userData) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);

		console.log(userCredential.user);
		return userCredential.user;
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
};

export const firebaseLoginWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);

		console.log(userCredential.user);
		return userCredential.user;
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
};

export const firebaseLogOut = async () => {
	await signOut(auth)
		.then(() => console.log("Sign out complete"))
		.catch((exception) => console.log(exception));
};

export const firebaseSignUp = async (userData) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

		sendEmailVerification(userCredential.user);
		return userCredential.user;
	} catch (exception) {
		throw exception;
	}
};
