import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login,
  loginWithGoogle,
  signUp,
  signUpWithGoogle,
  getUser,
  completeRegister,
} from "@/services/api/auth/queries";
import { clearAuth, register } from "@/state/auth/authSlice";
import { loginCompleted } from "@/state/user/userSlice";

export function useLoginWithEmailAndPassword() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const user = await login({ email, password });
      try {
        const userLoggedin = await getUser(user.uid);
        return { user: userLoggedin, isLogged: true };
      } catch (error) {
        return { user, isLogged: false };
      }
    },
    onSuccess: (data) => {
      if (data.isLogged) {
        dispatch(clearAuth());
        dispatch(loginCompleted(data.user));
      } else {
        dispatch(register({ idUser: data.user.uid, email: data.user.email }));
      }
    },
  });
}

export function useLoginWithGoogle() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const user = await loginWithGoogle();
      try {
        const userLoggedin = await getUser(user.uid);
        return { user: userLoggedin, isLogged: true };
      } catch (error) {
        return { user, isLogged: false };
      }
    },
    onSuccess: (data) => {
      if (data.isLogged) {
        dispatch(clearAuth());
        dispatch(loginCompleted(data.user));
      } else {
        dispatch(register({ idUser: data.user.uid, email: data.user.email }));
      }
    },
  });
}

export function useSignUpWithEmailAndPassword() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const user = await signUp({ email, password });
      return user;
    },
    onSuccess: (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
    },
  });
}

export function useSignUpWithGoogle() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const user = await signUpWithGoogle();
      return user;
    },
    onSuccess: (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
    },
  });
}

export function useCompleteRegister() {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ uid, name, lastname, email }) => {
      await completeRegister({ uid, name, lastname, email });
      const user = await getUser(uid);
      return user;
    },
    onSuccess: (data) => {
      dispatch(clearAuth());
      dispatch(loginCompleted(data));
    },
  });
}
