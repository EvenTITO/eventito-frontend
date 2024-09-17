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

export default function Content() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contenido de entrega</CardTitle>
        <CardDescription>
          Ingresar los siguientes datos para completar la entrega.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Ingresar título del trabajo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="track">Track</Label>
            <Select>
              <SelectTrigger id="track">
                <SelectValue placeholder="Seleccionar un track" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IA">IA</SelectItem>
                <SelectItem value="Química">Química</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            placeholder="Ingresar keywords (separadas por coma)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea
            id="abstract"
            placeholder="Ingresar el abstract del trabajo"
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pdf">Cargar PDF</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="pdf"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("pdf")?.click()}
              variant="outline"
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {file ? file.name : "Elegir archivo PDF"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
