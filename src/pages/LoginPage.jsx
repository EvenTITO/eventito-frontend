import "@/features/authentication/styles/notLoggin.css";
import { Link } from "react-router-dom";
import LoginWithGoogleButton from '@/features/authentication/components/login/LoginWithGoogleButton';
import LoginForm from '@/features/authentication/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-300">
      <div className="bg-slate-50 rounded-xl border border-gray-300 p-4 px-10">
        <div className="my-10 mb-20 flex flex-col items-center gap-4">
          <h1 className="text-4xl text-center mb-4">Iniciar sesión</h1>
          <div>
            <LoginForm />
            <LoginWithGoogleButton />
            <div className="text-center py-2 text-gray-500">
              ¿No tenés cuenta? <Link className="underline text-black" to={'/register'}>Crear cuenta</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
