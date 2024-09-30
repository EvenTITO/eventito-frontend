import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  login,
  loginWithGoogle,
  signUp,
  signUpWithGoogle,
  getUser,
} from "@/services/api/auth/queries";
import { clearAuth, register } from "@/state/auth/authSlice";
import { loginCompleted } from "@/state/user/userSlice";

export function useLoginWithEmailAndPassword() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const user = await login({ email, password });
      return user;
    },
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
      const userObtained = await getUser(data.uid);
      dispatch(clearAuth());
      dispatch(loginCompleted(userObtained));
    },
  });
}

export function useLoginWithGoogle() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const user = await loginWithGoogle();
      return user;
    },
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
      const userObtained = await getUser(data.uid);
      dispatch(clearAuth());
      dispatch(loginCompleted(userObtained));
    },
  });
}

export function useSignUpWithEmailAndPassword() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const user = await signUp({ email, password });
      return user;
    },
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
      const userObtained = await getUser(data.uid);
      dispatch(clearAuth());
      dispatch(loginCompleted(userObtained));
    },
  });
}

export function useSignUpWithGoogle() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const user = await signUpWithGoogle();
      return user;
    },
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }));
      const userObtained = await getUser(data.uid);
      dispatch(clearAuth());
      dispatch(loginCompleted(userObtained));
    },
  });
}
