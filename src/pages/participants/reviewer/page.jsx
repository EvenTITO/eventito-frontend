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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  FileDown,
  Calendar,
  Users,
  User,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";

export default function ReviewerDashboard() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Machine Learning in Healthcare: A Comprehensive Study",
      authorCount: 3,
      submitter: "Dr. Jane Smith",
      maxReviewDate: new Date(2023, 6, 15),
      track: "AI in Medicine",
      authors: ["Dr. Jane Smith", "Prof. John Doe", "Dr. Emily Brown"],
      orator: "Dr. Jane Smith",
      abstract:
        "This study explores the transformative potential of machine learning in healthcare, focusing on early disease detection, personalized treatment plans, and predictive analytics. We present a novel approach that combines deep learning algorithms with electronic health records to improve diagnostic accuracy and patient outcomes. Our findings suggest significant improvements in early detection rates for several chronic conditions, potentially revolutionizing preventive care strategies.",
      pdfLink: "https://example.com/machine-learning-healthcare.pdf",
    },
    {
      id: 2,
      title: "Quantum Computing: A New Era",
      authorCount: 2,
      submitter: "Prof. John Doe",
      maxReviewDate: new Date(2023, 6, 20),
      track: "Quantum Technologies",
      authors: ["Prof. John Doe", "Dr. Alice Johnson"],
      orator: "Prof. John Doe",
      abstract:
        "This paper introduces groundbreaking advancements in quantum computing, showcasing a novel approach to qubit manipulation that significantly reduces decoherence. Our research demonstrates a 50% improvement in quantum circuit depth, paving the way for more complex quantum algorithms and bringing us closer to practical quantum supremacy.",
      pdfLink: "https://example.com/quantum-computing-new-era.pdf",
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions",
      authorCount: 4,
      submitter: "Dr. Emily Brown",
      maxReviewDate: new Date(2023, 6, 18),
      track: "Green Technologies",
      authors: [
        "Dr. Emily Brown",
        "Dr. Michael Green",
        "Prof. Sarah Lee",
        "Dr. David Chen",
      ],
      orator: "Dr. Emily Brown",
      abstract:
        "Our research presents an innovative approach to sustainable energy production, combining advanced solar cell technology with AI-driven energy distribution systems. This integrated solution shows a 30% increase in energy efficiency and a 25% reduction in carbon emissions compared to current best practices, offering a scalable model for smart cities of the future.",
      pdfLink: "https://example.com/sustainable-energy-solutions.pdf",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState("entregas");
  const [review, setReview] = useState({
    technicalMerit: "",
    novelty: "",
    clarity: "",
    relevance: "",
    overallRecommendation: "",
    confidenceLevel: "",
    commentsToAuthors: "",
    confidentialComments: "",
  });

  const handleRowClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleReviewChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReview = () => {
    console.log("Submitting review:", review);
    alert("Review submitted successfully!");
    setSelectedAssignment(null);
    setReview({
      technicalMerit: "",
      novelty: "",
      clarity: "",
      relevance: "",
      overallRecommendation: "",
      confidenceLevel: "",
      commentsToAuthors: "",
      confidentialComments: "",
    });
  };

  if (selectedAssignment) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelectedAssignment(null);
          }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a asignaciones
        </a>
        <h1 className="text-3xl font-bold mb-6">{selectedAssignment.title}</h1>

        <div className="mb-6">
          <div className="flex border-b">
            {["Entrega", "Formulario"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                  activeTab === tab.toLowerCase().replace(" ", "-")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() =>
                  setActiveTab(tab.toLowerCase().replace(" ", "-"))
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "entrega" && (
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Autores:</span>{" "}
                {selectedAssignment.authors.join(", ")}
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Orador:</span>{" "}
                {selectedAssignment.orator}
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Track:</span>{" "}
                {selectedAssignment.track}
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">Fecha límite de revisión:</span>{" "}
                {format(selectedAssignment.maxReviewDate, "MMMM d, yyyy")}
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Abstract</h3>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <p>{selectedAssignment.abstract}</p>
                </ScrollArea>
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  window.open(selectedAssignment.pdfLink, "_blank")
                }
              >
                <FileDown className="mr-2 h-4 w-4" /> Descargar entrega (PDF)
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "formulario" && (
          <Card>
            <CardHeader>
              <CardTitle>Formulario de revisión</CardTitle>
              <CardDescription>
                Respondé algunas preguntas para finalizar la revisión.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Calificación", field: "technicalMerit" },
                ].map((item) => (
                  <div key={item.field} className="space-y-2">
                    <Label className="text-lg font-semibold">
                      {item.label}
                    </Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        handleReviewChange(item.field, value)
                      }
                      className="flex justify-between"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex flex-col items-center">
                          <RadioGroupItem
                            value={value.toString()}
                            id={`${item.field}-${value}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`${item.field}-${value}`}
                            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                              review[item.field] === value.toString()
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-semibold">
                  Estado del trabajo
                </Label>
                <RadioGroup
                  onValueChange={(value) =>
                    handleReviewChange("overallRecommendation", value)
                  }
                  className="flex flex-wrap gap-4"
                >
                  {["Aceptado", "Correcciones", "Rechazado"].map(
                    (option) => (
                      <div key={option} className="flex items-center">
                        <RadioGroupItem
                          value={option}
                          id={`recommendation-${option}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`recommendation-${option}`}
                          className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
                            review.overallRecommendation === option
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="comments-to-authors"
                  className="text-lg font-semibold"
                >
                  Comentarios al autor
                </Label>
                <Textarea
                  id="comments-to-authors"
                  placeholder="Realizá un resumen de los cambios solicitados."
                  value={review.commentsToAuthors}
                  onChange={(e) =>
                    handleReviewChange("commentsToAuthors", e.target.value)
                  }
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confidential-comments"
                  className="text-lg font-semibold"
                >
                  Comentario al comité organizador (confidencial)
                </Label>
                <Textarea
                  id="confidential-comments"
                  placeholder="Agregá cualquier comentario que consideres necesario acerca de esta entrega."
                  value={review.confidentialComments}
                  onChange={(e) =>
                    handleReviewChange("confidentialComments", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitReview} className="w-full">
                Finalizar revisión
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Asignaciones de revisión</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha límite de revisión</TableHead>
            <TableHead>Track</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow
              key={assignment.id}
              onClick={() => handleRowClick(assignment)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{assignment.title}</TableCell>
              <TableCell>{assignment.authorCount}</TableCell>
              <TableCell>{assignment.submitter}</TableCell>
              <TableCell>
                {format(assignment.maxReviewDate, "MMM d, yyyy")}
              </TableCell>
              <TableCell>{assignment.track}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
