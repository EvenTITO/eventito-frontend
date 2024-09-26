import { useState } from "react";
import { Upload, Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Content({ submissionData, onSubmit }) {
  const [title, setTitle] = useState(submissionData.title);
  const [track, setTrack] = useState(submissionData.track);
  const [keywords, setKeywords] = useState(submissionData.keywords);
  const [abstract, setAbstract] = useState(submissionData.abstract);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(submissionData.pdfFileName);
  const [authors, setAuthors] = useState(submissionData.authors || []);
  const [newAuthor, setNewAuthor] = useState({ name: "", email: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      track,
      keywords,
      abstract,
      pdfFileName: fileName,
      authors,
    });
  };

  const addAuthor = () => {
    if (newAuthor.name && newAuthor.email) {
      setAuthors([...authors, newAuthor]);
      setNewAuthor({ name: "", email: "" });
      setDialogOpen(false);
    }
  };

  const removeAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="flex space-x-8">
      <div className="flex-grow space-y-8">
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
              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Autores</span>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar autor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar nuevo autor</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="authorName">Nombre del autor</Label>
                      <Input
                        id="authorName"
                        value={newAuthor.name}
                        onChange={(e) =>
                          setNewAuthor({ ...newAuthor, name: e.target.value })
                        }
                        placeholder="Ingresar nombre del autor"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authorEmail">Email del autor</Label>
                      <Input
                        id="authorEmail"
                        type="email"
                        value={newAuthor.email}
                        onChange={(e) =>
                          setNewAuthor({ ...newAuthor, email: e.target.value })
                        }
                        placeholder="Ingresar email del autor"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={addAuthor}
                      disabled={!newAuthor.name || !newAuthor.email}
                    >
                      Agregar autor
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                  onClick={() => setSelectedAuthor(author)}
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${author.name}`}
                    />
                    <AvatarFallback>{""}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {author.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={selectedAuthor !== null}
        onOpenChange={() => setSelectedAuthor(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar autor: {selectedAuthor?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Nombre
              </Label>
              <p>{selectedAuthor?.name}</p>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <p>{selectedAuthor?.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAuthor(null)}>
              Cerrar
            </Button>
            <Button
              onClick={() => {
                removeAuthor(
                  authors.findIndex((a) => a.email === selectedAuthor.email),
                );
                setSelectedAuthor(null);
              }}
            >
              Eliminar autor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
