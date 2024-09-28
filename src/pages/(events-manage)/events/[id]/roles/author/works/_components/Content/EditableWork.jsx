import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditWork } from "@/hooks/events/authorHooks";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { useGetEvent } from "@/hooks/events/useEventState";

export default function EditableWork({ workData }) {
  const [title, setTitle] = useState(workData.title);
  const [track, setTrack] = useState(workData.track);
  const [keywords, setKeywords] = useState(workData.keywords?.join(','));
  const [abstract, setAbstract] = useState(workData.abstract);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(workData.pdfFileName);

  const { mutateAsync: editSubmission, isPending, error } = useEditWork();
  const { data: eventData } = useGetEvent();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editSubmission({
      workData: {
        title,
        track,
        keywords,
        abstract,
        file,
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar contenido de entrega</CardTitle>
        <CardDescription>
          Modifique los siguientes datos para actualizar la entrega.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresar título del trabajo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="track">Track</Label>
              <Select value={track} onValueChange={setTrack}>
                <SelectTrigger id="track">
                  <SelectValue placeholder="Seleccionar un track">
                    {track || "Seleccionar un track"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {eventData?.tracks.map((trackItem) => (
                    <SelectItem key={trackItem} value={trackItem}>
                      {trackItem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ingresar keywords (separadas por coma)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Ingresar el abstract del trabajo"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => document.getElementById("pdf")?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {fileName || "Elegir archivo PDF"}
              </Button>
            </div>
          </div>
          <ButtonWithLoading
            type="submit"
            className="w-full"
            isLoading={isPending}
          >
            Guardar cambios
          </ButtonWithLoading>
        </form>
      </CardContent>
    </Card>
  );
}
