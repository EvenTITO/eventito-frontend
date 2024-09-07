import React, { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileDown,
  Calendar,
  Users,
  User,
  BookOpen,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Save,
} from "lucide-react";
import { format } from "date-fns";

export default function PresenterDashboard() {
  const [works, setWorks] = useState([
    {
      id: 1,
      title: "Machine Learning in Healthcare: A Comprehensive Study",
      authors: [
        { name: "Dr. Jane Smith", isOrator: true },
        { name: "Prof. John Doe", isOrator: false },
        { name: "Dr. Emily Brown", isOrator: false },
      ],
      submissionDate: new Date(2023, 5, 1),
      status: "Under Review",
      track: "AI in Medicine",
      abstract:
        "This study explores the transformative potential of machine learning in healthcare, focusing on early disease detection, personalized treatment plans, and predictive analytics. We present a novel approach that combines deep learning algorithms with electronic health records to improve diagnostic accuracy and patient outcomes. Our findings suggest significant improvements in early detection rates for several chronic conditions, potentially revolutionizing preventive care strategies.",
      pdfLink: "https://example.com/machine-learning-healthcare.pdf",
    },
    {
      id: 2,
      title: "Quantum Computing: A New Era",
      authors: [
        { name: "Prof. John Doe", isOrator: true },
        { name: "Dr. Alice Johnson", isOrator: false },
      ],
      submissionDate: new Date(2023, 5, 15),
      status: "Accepted",
      track: "Quantum Technologies",
      abstract:
        "This paper introduces groundbreaking advancements in quantum computing, showcasing a novel approach to qubit manipulation that significantly reduces decoherence. Our research demonstrates a 50% improvement in quantum circuit depth, paving the way for more complex quantum algorithms and bringing us closer to practical quantum supremacy.",
      pdfLink: "https://example.com/quantum-computing-new-era.pdf",
    },
  ]);

  const [selectedWork, setSelectedWork] = useState(null);
  const [isNewSubmission, setIsNewSubmission] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newWork, setNewWork] = useState({
    title: "",
    authors: [{ name: "", isOrator: false }],
    abstract: "",
    track: "",
    pdfFile: null,
  });

  const handleRowClick = (work) => {
    setSelectedWork(work);
    setIsNewSubmission(false);
    setIsEditing(false);
  };

  const handleNewSubmission = () => {
    setSelectedWork(null);
    setIsNewSubmission(true);
    setIsEditing(false);
  };

  const handleNewWorkChange = (field, value) => {
    setNewWork((prev) => ({ ...prev, [field]: value }));
  };

  const handleAuthorChange = (index, field, value) => {
    const updatedAuthors = [...newWork.authors];
    updatedAuthors[index] = { ...updatedAuthors[index], [field]: value };
    if (field === "isOrator" && value) {
      updatedAuthors.forEach((author, i) => {
        if (i !== index) author.isOrator = false;
      });
    }
    setNewWork((prev) => ({ ...prev, authors: updatedAuthors }));
  };

  const addAuthor = () => {
    setNewWork((prev) => ({
      ...prev,
      authors: [...prev.authors, { name: "", isOrator: false }],
    }));
  };

  const removeAuthor = (index) => {
    setNewWork((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewWork((prev) => ({ ...prev, pdfFile: file }));
    }
  };

  const handleSubmitWork = () => {
    console.log("Submitting new work:", newWork);
    setIsNewSubmission(false);
    setNewWork({
      title: "",
      authors: [{ name: "", isOrator: false }],
      abstract: "",
      track: "",
      pdfFile: null,
    });
  };

  const handleEditWork = () => {
    setIsEditing(true);
    setNewWork({
      ...selectedWork,
      pdfFile: null,
    });
  };

  const handleSaveEdit = () => {
    console.log("Saving edited work:", newWork);
    setWorks((prevWorks) =>
      prevWorks.map((work) =>
        work.id === selectedWork.id
          ? {
              ...newWork,
              id: work.id,
              submissionDate: work.submissionDate,
              status: work.status,
            }
          : work,
      ),
    );
    setSelectedWork({
      ...newWork,
      id: selectedWork.id,
      submissionDate: selectedWork.submissionDate,
      status: selectedWork.status,
    });
    setIsEditing(false);
    alert("Work updated successfully!");
  };

  if (selectedWork) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedWork(null);
            setIsEditing(false);
          }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mis entregas
        </a>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{selectedWork.title}</h1>
          {!isEditing && (
            <Button onClick={handleEditWork}>
              <Edit2 className="mr-2 h-4 w-4" /> Editar entrega
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Titulo</Label>
                  <Input
                    id="edit-title"
                    value={newWork.title}
                    onChange={(e) =>
                      handleNewWorkChange("title", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Autores</Label>
                  {newWork.authors.map((author, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <Input
                        value={author.name}
                        onChange={(e) =>
                          handleAuthorChange(index, "name", e.target.value)
                        }
                        placeholder="Author name"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`orator-${index}`}
                          checked={author.isOrator}
                          onCheckedChange={(checked) =>
                            handleAuthorChange(index, "isOrator", checked)
                          }
                        />
                        <Label htmlFor={`orator-${index}`}>Orator</Label>
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
                  <Label htmlFor="edit-track">Track</Label>
                  <Select
                    value={newWork.track}
                    onValueChange={(value) =>
                      handleNewWorkChange("track", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI in Medicine">
                        AI in Medicine
                      </SelectItem>
                      <SelectItem value="Quantum Technologies">
                        Quantum Technologies
                      </SelectItem>
                      <SelectItem value="Green Technologies">
                        Green Technologies
                      </SelectItem>
                      <SelectItem value="Internet of Things">
                        Internet of Things
                      </SelectItem>
                      <SelectItem value="Biotechnology">
                        Biotechnology
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-abstract">Abstract</Label>
                  <Textarea
                    id="edit-abstract"
                    value={newWork.abstract}
                    onChange={(e) =>
                      handleNewWorkChange("abstract", e.target.value)
                    }
                    className="min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-pdf-upload">
                    Cargar nuevo PDF
                  </Label>
                  <Input
                    id="edit-pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Autores:</span>
                  {selectedWork.authors.map((author, index) => (
                    <span key={index}>
                      {author.name}
                      {author.isOrator ? " (Presentador)" : ""}
                      {index < selectedWork.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Fecha de entrega:</span>{" "}
                  {format(selectedWork.submissionDate, "MMMM d, yyyy")}
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Track:</span>{" "}
                  {selectedWork.track}
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Estado:</span>{" "}
                  {selectedWork.status}
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Abstract</h3>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <p>{selectedWork.abstract}</p>
                  </ScrollArea>
                </div>
                <Button
                  className="w-full"
                  onClick={() => window.open(selectedWork.pdfLink, "_blank")}
                >
                  <FileDown className="mr-2 h-4 w-4" /> Descargar PDF de entrega
                  (PDF)
                </Button>
              </>
            )}
          </CardContent>
          {isEditing && (
            <CardFooter>
              <Button onClick={handleSaveEdit} className="w-full">
                <Save className="mr-2 h-4 w-4" /> Guardar cambios
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  }

  if (isNewSubmission) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsNewSubmission(false);
          }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a mis entregas
        </a>
        <h1 className="text-3xl font-bold mb-6">Nueva entrega</h1>

        <Card>
          <CardHeader>
            <CardTitle>Realizar una nueva entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newWork.title}
                onChange={(e) => handleNewWorkChange("title", e.target.value)}
                placeholder="Ingresa el titulo de tu trabajo"
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
                onChange={(e) =>
                  handleNewWorkChange("abstract", e.target.value)
                }
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
            <Button onClick={handleSubmitWork} className="w-full">
              Finalizar entrega
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis entregas</h1>
        <Button onClick={handleNewSubmission}>
          <Plus className="mr-2 h-4 w-4" /> Nueva entrega
        </Button>
      </div>
      {works.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-xl text-gray-500 mb-4">
              No se realizaron entregas.
            </p>
            <Button onClick={handleNewSubmission}>
              <Plus className="mr-2 h-4 w-4" /> Nueva entrega
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titulo</TableHead>
              <TableHead>Autores</TableHead>
              <TableHead>Fecha de entrega</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Track</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {works.map((work) => (
              <TableRow
                key={work.id}
                onClick={() => handleRowClick(work)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{work.title}</TableCell>
                <TableCell>
                  {work.authors.map((author) => author.name).join(", ")}
                </TableCell>
                <TableCell>
                  {format(work.submissionDate, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{work.status}</TableCell>
                <TableCell>{work.track}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

