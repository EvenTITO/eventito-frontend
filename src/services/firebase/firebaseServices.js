import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '@/services/firebase/firebaseAuth'

export const getAuthUser = () => {
  return auth.currentUser
}

export const firebaseLogin = async (userData) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  )
  return userCredential.user
}

export const firebaseLoginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  return userCredential.user
}

export const firebaseLogOut = async () => {
  await signOut(auth)
}

export const firebaseSignUp = async (userData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  )

  sendEmailVerification(userCredential.user)
  return userCredential.user
}

export const firebaseSignUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  return userCredential.user
}

export const firebaseSendResetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}
