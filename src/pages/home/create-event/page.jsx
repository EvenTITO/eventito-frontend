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
      <CreateEventStep3 step={step} />
    </div>
  );
}

/*
      <div
        className={cn(
          "py-4 bg-background",
          isScrollable ? "fixed bottom-0 left-0 right-0" : "",
        )}
      >
        <div className="container mx-auto px-4 max-w-3xl flex justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handleBack}>
              Atrás
            </Button>
          ) : (
            <Link to={"/home"}>
              <Button variant="outline">Cancelar</Button>
            </Link>
          )}
          {step < 3 ? (
            <Button type="button" onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              Crear evento
            </Button>
          )}
        </div>
      </div>
*/
