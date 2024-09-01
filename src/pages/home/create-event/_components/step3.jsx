import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { Container } from "./container";
import { BottomContainer } from "./bottomContainer";
import { useSelector } from "react-redux";
import SubmitButton from "./SubmitButton";

export default function CreateEventStep3({ step }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState(null);
  const { event_type: eventType } = useSelector((state) => state.createEvent);

  if (step === 3) {
    return (
      <>
        <Container>
          <form className="space-y-8">
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
                            <span>Seleccionar fecha</span>
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
          </form>
        </Container>
        <BottomContainer>
          <Button variant="outline" onClick={() => setStep(2)}>
            Atras
          </Button>
          <SubmitButton
            startDate={startDate}
            endDate={endDate}
            location={location}
          />
        </BottomContainer>
      </>
    );
  } else {
    return null;
  }
}
