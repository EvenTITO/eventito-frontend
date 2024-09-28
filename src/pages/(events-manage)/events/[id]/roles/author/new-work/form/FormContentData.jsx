import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { addAbstract } from "@/state/events/newWorkSlice";
import { Textarea } from "@/components/ui/textarea";

export default function FormContentData() {
  const dispatch = useDispatch();
  const [abstract, setAbstract] = useState(null);
  function changeAbstract(newAbstract) {
    setAbstract(newAbstract);
    dispatch(addAbstract(newAbstract));
  }

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Datos de la presentación</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Abstract de la presentación</Label>
        <Textarea
          id="abstract"
          value={abstract}
          onChange={(e) => changeAbstract(e.target.value)}
          placeholder="Ingrese el abstract. Recomendación: al menos 200 palabras"
          className="min-h-[200px]"
        />
      </div>
    </div>
  );
}
