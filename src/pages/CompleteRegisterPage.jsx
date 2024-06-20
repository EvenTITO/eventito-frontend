import "@/features/authentication/styles/notLoggin.css";
import CompleteRegisterForm from "@/features/authentication/components/register/CompleteRegisterForm";

export default function CompleteRegisterPage() {
  return (
    <div className={styles.container}>
      <CompleteRegisterForm />
    </div>
  );
}


const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};
