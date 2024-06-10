import "@/features/authentication/styles/notLoggin.css";
import RegisterForm2 from '@/features/authentication/components/register/RegisterForm2';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm2 />
    </div>
  );
}

const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};

