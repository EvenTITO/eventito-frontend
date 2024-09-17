import { useNavigator } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";

export default function GoBackLink({ to, text }) {
  const navigator = useNavigator(to);
  function handleBack() {
    navigator.back();
  }

  return (
    <a
      href="#"
      onClick={handleBack}
      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> {text}
    </a>
  );
}
