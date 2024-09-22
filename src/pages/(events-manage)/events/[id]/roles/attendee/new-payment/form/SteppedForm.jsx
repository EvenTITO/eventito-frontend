import { useState } from "react";
import FormSelectPayment from "./FormSelectPayment";
import FormSubmitPayment from "./FormSubmitFile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SteppedForm({ onSave, onCancel, booleanForSteps }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const steps = [
    <FormSelectPayment setError={setError} />,
    <FormSubmitPayment setError={setError} />,
  ];

  function stepIsCompleted() {
    if (booleanForSteps[step]) {
      return true;
    } else {
      setError("Completar los datos para continuar.");
      return false;
    }
  }

  function handleNext() {
    if (stepIsCompleted()) {
      setError("");
      setStep(step + 1);
    }
  }

  function handleSubmit() {
    if (stepIsCompleted()) {
      setError("");
      onSave();
    }
  }

  return (
    <FormContainer>
      <FormContent>
        <FormHeader title={"Proceso de pago"} />

        <form id="form-content" className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {steps.map((stepItem, idx) => idx === step && stepItem)}
        </form>
      </FormContent>

      <FormBottom
        isScrollable={true}
        handleCancel={onCancel}
        step={step}
        setStep={setStep}
        amountSteps={steps.length - 1}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </FormContainer>
  );
}

function FormContainer({ children }) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}

function FormContent({ children }) {
  return (
    <div className="flex-grow overflow-auto">
      <div className="container mx-auto px-4 py-8 max-w-3xl">{children}</div>
    </div>
  );
}

function FormHeader({ title }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>
    </>
  );
}

function FormBottom({
  isScrollable,
  handleCancel,
  step,
  setStep,
  amountSteps,
  handleNext,
  handleSubmit,
}) {
  return (
    <div
      className={cn(
        "py-4 bg-background",
        isScrollable ? "fixed bottom-0 left-0 right-0" : "",
      )}
    >
      <div className="container mx-auto px-4 max-w-3xl flex justify-between">
        {step === 0 ? (
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Atrás
          </Button>
        )}
        {step < amountSteps ? (
          <Button onClick={handleNext}>Siguiente</Button>
        ) : (
          <Button onClick={handleSubmit}>Finalizar</Button>
        )}
      </div>
    </div>
  );
}
