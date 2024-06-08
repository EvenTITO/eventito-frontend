import "@/features/authentication/styles/notLoggin.css";
import { Link } from "react-router-dom";
import RegisterForm from "@/features/authentication/components/register/RegisterForm";
import RegisterWithGoogleButton from "@/features/authentication/components/register/RegisterWithGoogleButton";

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-300">
      <div className="bg-slate-50 rounded-xl border border-gray-300 p-4 px-10">
        <div className="my-10 mb-20 flex flex-col items-center gap-4">
          <h1 className="text-4xl text-center mb-4">Crear cuenta</h1>
          <div>
            <RegisterForm />
            <RegisterWithGoogleButton />
            <div className="text-center py-2 text-gray-500">
              ¿Ya tenés cuenta? <Link className="underline text-black" to={'/login'}>Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

