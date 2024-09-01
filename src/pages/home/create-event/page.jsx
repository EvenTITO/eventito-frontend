import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventStep1 from "./_components/step1";
import CreateEventStep2 from "./_components/step2";
import CreateEventStep3 from "./_components/step3";
import { useToast } from "@/hooks/use-toast";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const checkScrollable = () => {
      const content = document.getElementById("form-content");
      if (content) {
        setIsScrollable(content.scrollHeight > window.innerHeight - 200);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [step]);

  const handleSubmit = () => {
    // fetch backend
    const fetchError = true;
    if (fetchError) {
      toast({
        variant: "destructiveOutline",
        title: "Error al crear el evento",
        description: "El titulo se encuentra repetido",
      });
    } else {
      navigate("/home/my-events");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <CreateEventStep1 step={step} setStep={setStep} />
      <CreateEventStep2 step={step} setStep={setStep} />
      <CreateEventStep3 step={step} setStep={setStep} />
    </div>
  );
}
