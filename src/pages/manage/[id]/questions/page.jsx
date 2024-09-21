import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

export default function RevisionesPage() {
  const [preguntas, setPreguntas] = useState([
    {
      id: 1,
      texto: "¿Cuál es la calidad general del trabajo?",
      tipo: "numerica",
      requerida: true,
    },
    {
      id: 2,
      texto: "¿El trabajo es original?",
      tipo: "seleccion",
      opciones: ["Sí", "No", "Parcialmente"],
      requerida: true,
    },
    {
      id: 3,
      texto: "Comentarios adicionales",
      tipo: "texto",
      requerida: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    texto: "",
    tipo: "texto",
    requerida: false,
  });

  const handleAddOrUpdatePregunta = (e) => {
    e.preventDefault();
    if (editingPregunta) {
      setPreguntas(
        preguntas.map((p) =>
          p.id === editingPregunta.id
            ? { ...editingPregunta, ...nuevaPregunta }
            : p,
        ),
      );
    } else {
      setPreguntas([
        ...preguntas,
        { id: preguntas.length + 1, ...nuevaPregunta },
      ]);
    }
    setNuevaPregunta({
      texto: "",
      tipo: "texto",
      requerida: false,
    });
    setEditingPregunta(null);
    setIsOpen(false);
  };

  const handleEditPregunta = (pregunta) => {
    setEditingPregunta(pregunta);
    setNuevaPregunta(pregunta);
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Configuración de Revisiones</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lista de Preguntas</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nueva Pregunta
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingPregunta ? "Editar Pregunta" : "Nueva Pregunta"}
              </SheetTitle>
            </SheetHeader>
            <form
              onSubmit={handleAddOrUpdatePregunta}
              className="space-y-4 mt-4"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Información de la Pregunta
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Label htmlFor="preguntaTexto">
                        Texto de la Pregunta
                      </Label>
                      <Textarea
                        id="preguntaTexto"
                        value={nuevaPregunta.texto}
                        onChange={(e) =>
                          setNuevaPregunta({
                            ...nuevaPregunta,
                            texto: e.target.value,
                          })
                        }
                        placeholder="Ingrese la pregunta"
                        required
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="preguntaTipo">Tipo de Respuesta</Label>
                      <Select
                        value={nuevaPregunta.tipo}
                        onValueChange={(value) =>
                          setNuevaPregunta({ ...nuevaPregunta, tipo: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="texto">Texto</SelectItem>
                          <SelectItem value="numerica">Numérica</SelectItem>
                          <SelectItem value="seleccion">Selección</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {nuevaPregunta.tipo === "seleccion" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="preguntaOpciones">
                          Opciones (separadas por coma)
                        </Label>
                        <Input
                          id="preguntaOpciones"
                          value={nuevaPregunta.opciones?.join(", ") || ""}
                          onChange={(e) =>
                            setNuevaPregunta({
                              ...nuevaPregunta,
                              opciones: e.target.value.split(", "),
                            })
                          }
                          placeholder="Opción 1, Opción 2, Opción 3"
                          required
                        />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Configuración Adicional</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requerida"
                        checked={nuevaPregunta.requerida}
                        onCheckedChange={(checked) => {
                          setNuevaPregunta({
                            ...nuevaPregunta,
                            requerida: Boolean(checked),
                          });
                        }}
                      />
                      <Label htmlFor="requerida">Pregunta Requerida</Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button type="submit" className="w-full">
                {editingPregunta ? "Actualizar Pregunta" : "Agregar Pregunta"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pregunta</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Requerida</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {preguntas.map((pregunta) => (
            <TableRow key={pregunta.id}>
              <TableCell className="font-medium">{pregunta.texto}</TableCell>
              <TableCell>{pregunta.tipo}</TableCell>
              <TableCell>{pregunta.requerida ? "Sí" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPregunta(pregunta)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

