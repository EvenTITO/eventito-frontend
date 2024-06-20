import "@/features/authentication/styles/notLoggin.css";
import ForgotPasswordForm from '@/features/authentication/components/login/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className={styles.container}>
      <ForgotPasswordForm />
    </div>
  );
}

const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};
