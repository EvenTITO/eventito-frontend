import { cn } from "@/lib/utils";

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

export default function CreateEventStep1({ step, eventType, setEventType }) {
  if (step === 1) {
    return (
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
              <p className="mt-2 text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
