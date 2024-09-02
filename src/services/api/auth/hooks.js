import { getUser, login } from "@/services/api/auth/queries";
import { useMutation } from "@tanstack/react-query";
import { clearAuth, register } from "@/state/auth/authSlice";
import { loginCompleted } from "@/state/user/userSlice";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: email }));
      console.log("cargando");
      const userObtained = await getUser(data.uid);

      dispatch(clearAuth());
      console.log("yendo a login");
      dispatch(loginCompleted(userObtained));
      console.log("completo");
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSettled: () => {
      console.log("settled");
    },
  });
}
