import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CreateEventStep2({
  step,
  title,
  setTitle,
  description,
  setDescription,
  organizer,
  setOrganizer,
}) {
  if (step === 2) {
    return (
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
              placeholder="Ingresar titulo del evento"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Descripcion</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingresar una descripcion corta del evento"
              required
            />
          </div>
          <div>
            <Label htmlFor="organizer">Organizado por</Label>
            <Input
              id="organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Ingresar persona, grupo u organizacion a cargo del evento"
              required
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
