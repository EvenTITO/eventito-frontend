import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import {
  useSignUpWithEmailAndPassword,
  useSignUpWithGoogle,
} from "@/hooks/auth/authHooks";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import ContainerAuthPage from "../_components/ContainerAuthPage";
import GoogleButton from "../_components/GoogleButton";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const signupMutation = useSignUpWithEmailAndPassword();
  const googleSignupMutation = useSignUpWithGoogle();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    setPasswordError("");
    await signupMutation.mutateAsync({ email, password });
  };

  const onGoogleSignup = async () => {
    await googleSignupMutation.mutateAsync();
  };

  if (currentUser) {
    return <Navigate to="/home" />;
  }

  return (
    <ContainerAuthPage title="Crear cuenta" isLogin={false}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Ingresá tu email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Ingresá tu contraseña"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="repeatPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Repetir Contraseña
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="repeatPassword"
              type="password"
              placeholder="Repetí tu contraseña"
              className="pl-10"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
        </div>
        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
        <ButtonWithLoading
          type="submit"
          className="w-full"
          isLoading={signupMutation.isPending}
        >
          Crear cuenta
        </ButtonWithLoading>
      </form>
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">O</span>
        </div>
      </div>
      <GoogleButton text="Registrarse con Google" onClick={onGoogleSignup} />
    </ContainerAuthPage>
  );
}
