import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Container } from "./container";
import { BottomContainer } from "./bottomContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addEventMandatory } from "@/state/events/createEventSlice";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDispatch } from "react-redux";

export default function CreateEventStep2({ step, setStep }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  function checkErrors() {
    const newErrors = !(title && description && organizer);
    setError(newErrors);
    return newErrors;
  }
  function handleNext() {
    if (!checkErrors()) {
      dispatch(
        addEventMandatory({
          title: title,
          description: description,
          organizer: organizer,
        }),
      );
      setStep(3);
    }
  }

  if (step === 2) {
    return (
      <>
        <Container>
          <form className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Completar todos los campos para continuar.
                </AlertDescription>
              </Alert>
            )}
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
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setError(false);
                    }}
                    placeholder="Ingresar titulo del evento"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripcion</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setError(false);
                    }}
                    placeholder="Ingresar una descripcion corta del evento"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organizer">Organizado por</Label>
                  <Input
                    id="organizer"
                    value={organizer}
                    onChange={(e) => {
                      setOrganizer(e.target.value);
                      setError(false);
                    }}
                    placeholder="Ingresar persona, grupo u organizacion a cargo del evento"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </Container>
        <BottomContainer>
          <Button variant="outline" onClick={() => setStep(1)}>
            Atras
          </Button>
          <Button type="button" onClick={handleNext}>
            Siguiente
          </Button>
        </BottomContainer>
      </>
    );
  } else {
    return null;
  }
}
