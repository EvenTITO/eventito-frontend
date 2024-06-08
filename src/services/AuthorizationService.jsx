import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "./FirebaseService";
import { createUser, getUser } from "./UserService";

export const login = async (userData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
    console.log(userCredential.user);

    const userObtained = await getUser(userCredential.user.uid);
    return userObtained;
  } catch (exception) {
    console.log(exception);
    throw exception;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const userObtained = await getUser(userCredential.user.uid);
    return userObtained;
  } catch (exception) {
    console.log(exception);
    throw exception;
  }
};

export const logOut = async () => {
  await signOut(auth)
    .then(() => console.log("Sign out complete"))
    .catch((exception) => console.log(exception));
};

export const signUp = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

    sendEmailVerification(userCredential.user);
    const res = createUser(userCredential.user.uid, userData.name, null);

    if (res.error) {
      logOut();
      alert(res.error);
    }
    return res;
  } catch (exception) {
    throw exception;
  }
};
