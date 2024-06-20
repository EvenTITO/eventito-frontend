import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	sendEmailVerification,
	sendPasswordResetEmail,
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
		return userCredential.user;
	} catch (exception) {
		throw exception;
	}
};

export const firebaseLoginWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);
		return userCredential.user;
	} catch (exception) {
		throw exception;
	}
};

export const firebaseLogOut = async () => {
	await signOut(auth);
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

export const firebaseSignUpWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);
		return userCredential.user;
	} catch (exception) {
		console.log(exception);
		throw exception;
	}
};

export const firebaseSendResetPassword = async (email) => {
	await sendPasswordResetEmail(auth, email);
};
