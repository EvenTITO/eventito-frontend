import { useState } from "react";
import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

export default function NewSubmissionPage() {
  const navigator = useNavigator("/new-submission");
  const [newWork, setNewWork] = useState({
    title: "",
    authors: [{ name: "", isSpeaker: false }],
    abstract: "",
    track: "",
    pdfFile: null,
  });

  function handleBack() {
    navigator.back();
  }

  function handleSave() {
    navigator.back();
  }

  function handleNewWorkChange(field, value) {
    setNewWork((prev) => ({ ...prev, [field]: value }));
  }

  function handleAuthorChange(index, field, value) {
    const updatedAuthors = [...newWork.authors];
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value };
    if (field === "isOrator" && value) {
      updatedAuthors.forEach((author, i) => {
        if (i !== index) author.isOrator = false;
      });
    }
    setNewWork((prev) => ({ ...prev, authors: updatedAuthors }));
  }

  function addAuthor() {
    setNewWork((prev) => ({
      ...prev,
      authors: [...prev.authors, { name: "", isOrator: false }],
    }));
  }

  function removeAuthor(index) {
    setNewWork((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setNewWork((prev) => ({ ...prev, pdfFile: file }));
    }
  }

  return (
    <ContainerPage>
      <a
        href="#"
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mis entregas
      </a>

      <Card>
        <CardHeader>
          <CardTitle>Nueva entrega</CardTitle>
          <CardDescription>
            Ingresar los siguientes datos obligatorios para finalizar la
            entrega.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={newWork.title}
              onChange={(e) => handleNewWorkChange("title", e.target.value)}
              placeholder="Ingresar el titulo de tu trabajo"
            />
          </div>
          <div className="space-y-2">
            <Label>Authors</Label>
            {newWork.authors.map((author, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={author.name}
                  onChange={(e) =>
                    handleAuthorChange(index, "name", e.target.value)
                  }
                  placeholder="Nombre del autor"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`orator-${index}`}
                    checked={author.isOrator}
                    onCheckedChange={(checked) =>
                      handleAuthorChange(index, "isOrator", checked)
                    }
                  />
                  <Label htmlFor={`orator-${index}`}>Presentador</Label>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeAuthor(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addAuthor}>
              <Plus className="mr-2 h-4 w-4" /> Agregar autor
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="track">Track</Label>
            <Select
              onValueChange={(value) => handleNewWorkChange("track", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI in Medicine">AI in Medicine</SelectItem>
                <SelectItem value="Quantum Technologies">
                  Quantum Technologies
                </SelectItem>
                <SelectItem value="Green Technologies">
                  Green Technologies
                </SelectItem>
                <SelectItem value="Internet of Things">
                  Internet of Things
                </SelectItem>
                <SelectItem value="Biotechnology">Biotechnology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={newWork.abstract}
              onChange={(e) => handleNewWorkChange("abstract", e.target.value)}
              placeholder="Ingresa el abstract de tu trabajo"
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf-upload">Subir PDF</Label>
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            Finalizar entrega
          </Button>
        </CardFooter>
      </Card>
    </ContainerPage>
  );
}
