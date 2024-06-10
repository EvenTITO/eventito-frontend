import "@/features/authentication/styles/notLoggin.css";
import { Link } from "react-router-dom";
import LoginWithGoogleButton from '@/features/authentication/components/login/LoginWithGoogleButton';
//import LoginForm from '@/features/authentication/components/login/LoginForm';
import LoginForm2 from '@/features/authentication/components/login/LoginForm2';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm2 />
    </div>
  );
}

const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};
