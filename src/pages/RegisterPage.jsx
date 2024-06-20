import "@/features/authentication/styles/notLoggin.css";
import RegisterForm from '@/features/authentication/components/register/RegisterForm';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};

