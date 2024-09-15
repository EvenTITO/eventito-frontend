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
  FileDown,
  Calendar,
  Users,
  User,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";

export default function Page({ selectedAssignment }) {
  const navigator = useNavigator("/assignments");

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

  function handleBack(e) {
    e.preventDefault();
    navigator.back();
  }

  const handleReviewChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReview = () => {
    console.log("Submitting review:", review);
    navigator.back();
  };

  function WorkTab() {
    return (
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
            <span className="font-semibold">
              Fecha límite de revisión:
            </span>{" "}
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
            onClick={() => window.open(selectedAssignment.pdfLink, "_blank")}
          >
            <FileDown className="mr-2 h-4 w-4" /> Descargar entrega (PDF)
          </Button>
        </CardContent>
      </Card>
    );
  }

  function FormTab() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Formulario de revisión</CardTitle>
          <CardDescription>
            Respondé algunas preguntas para finalizar la revisión.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ label: "Calificación", field: "technicalMerit" }].map(
              (item) => (
                <div key={item.field} className="space-y-2">
                  <Label className="text-lg font-semibold">{item.label}</Label>
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
              ),
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Estado del trabajo</Label>
            <RadioGroup
              onValueChange={(value) =>
                handleReviewChange("overallRecommendation", value)
              }
              className="flex flex-wrap gap-4"
            >
              {["Aceptado", "Correcciones", "Rechazado"].map((option) => (
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
              ))}
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
    );
  }

  return (
    <ContainerPage>
      <a
        href="#"
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a asignaciones
      </a>
      <TitlePage title={selectedAssignment.title} />

      <div className="mb-6">
        <LineTabs
          tabs={[
            { label: "Entrega", component: <WorkTab /> },
            { label: "Formulario", component: <FormTab /> },
          ]}
        />
      </div>
    </ContainerPage>
  );
}
