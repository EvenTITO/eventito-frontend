import "@/features/authentication/styles/notLoggin.css";
import LoginForm from '@/features/authentication/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};
