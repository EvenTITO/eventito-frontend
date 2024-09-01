import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";

const eventTypes = [
  {
    id: "conference",
    title: "Conferencia",
    description:
      "Evento de multiples dias, con charlas, presentaciones de trabajos, aprobacion de los mismos, etc",
  },
  {
    id: "talk",
    title: "Charla",
    description: "Evento de un unico dia, con charlas.",
  },
];

export default function CreateEvent() {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [location, setLocation] = useState("");
  const [isScrollable, setIsScrollable] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      eventType,
      title,
      description,
      organizer,
      startDate,
      endDate,
      location,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Crear nuevo evento</h1>
          <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>

          <form onSubmit={handleSubmit} id="form-content" className="space-y-8">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Paso 1: Seleccionar el tipo de evento
                </h2>
                <div className="flex flex-col gap-4 sm:grid-cols-2">
                  {eventTypes.map((type) => (
                    <div
                      key={type.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        eventType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary",
                      )}
                      onClick={() => setEventType(type.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2",
                            eventType === type.id
                              ? "border-primary bg-primary"
                              : "border-gray-400",
                          )}
                        ></div>
                        <h3 className="font-semibold">{type.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Paso 2: Informacion general
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titulo</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">
                      Descripcion corta del evento
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter event description"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizer">Organizado por</Label>
                    <Input
                      id="organizer"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      placeholder="Enter organizer name"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Paso 3: informacion adicional
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Fecha de inicio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {eventType === "conference" && (
                    <div>
                      <Label>Fecha de finalizacion</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? (
                              format(endDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="location">Ubicacion</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ingresar ubicacion del evento"
                    />
                  </div>
                </div>
              </div>
            )}
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
              <Button variant="outline">
                Cancelar
              </Button>
            </Link>
          )}
          {step < 3 ? (
            <Button type="button" onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" form="form-content">
              Crear evento
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
