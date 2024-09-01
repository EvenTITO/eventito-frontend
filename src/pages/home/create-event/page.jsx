import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import CreateEventStep1 from "./_components/step1";
import CreateEventStep2 from "./_components/step2";
import CreateEventStep3 from "./_components/step3";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState("");
  const [isScrollable, setIsScrollable] = useState(false);

  const [createError, setCreateError] = useState(false);
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      variant: "destructiveOutline",
      title: "Error al crear el evento",
      description: "El titulo se encuentra repetido",
    });

    console.log("creando evento");
    console.log({
      eventType,
      title,
      description,
      organizer,
      startDate,
      endDate,
      location,
    });
    //navigate("/home/my-events");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Crear nuevo evento</h1>
          <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>

          <form className="space-y-8">
            <CreateEventStep1
              step={step}
              eventType={eventType}
              setEventType={setEventType}
            />
            <CreateEventStep2
              step={step}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              organizer={organizer}
              setOrganizer={setOrganizer}
            />
            <CreateEventStep3
              step={step}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              location={location}
              setLocation={setLocation}
              eventType={eventType}
            />
          </form>
        </div>
      </div>

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
    </div>
  );
}
