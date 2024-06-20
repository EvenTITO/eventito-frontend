import "@/features/authentication/styles/notLoggin.css";
import CompleteDataForm from '@/features/authentication/components/register/CompleteDataForm';

export default function CompleteUserDataPage() {
  return (
    <div className={styles.container}>
      <CompleteDataForm />
    </div>
  );
}


const styles = {
  container: "w-full min-h-screen flex items-center justify-center bg-slate-300"
};
