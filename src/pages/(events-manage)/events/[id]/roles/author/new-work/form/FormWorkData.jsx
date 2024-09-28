import { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addKeywords,
  addTitle,
  addTrack,
} from "@/state/events/newWorkSlice";

export default function FormWorkData({ tracks }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");

  function changeTitle(newTitle) {
    setTitle(newTitle);
    dispatch(addTitle(newTitle));
  }
  function changeTrack(newTrack) {
    setSelectedTrack(newTrack);
    dispatch(addTrack(newTrack));
  }
  function changeKeywords(newKeywords) {
    setKeywords(newKeywords);
    dispatch(addKeywords(newKeywords));
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Datos de la presentación</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          placeholder="Ingrese el título de su trabajo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keywords">Palabras clave</Label>
        <Input
          id="keywords"
          value={keywords}
          onChange={(e) => changeKeywords(e.target.value)}
          placeholder="Ingrese palabras clave separadas por comas"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="track">Track</Label>
        <Select value={selectedTrack} onValueChange={changeTrack}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un track" />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track} value={track}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
