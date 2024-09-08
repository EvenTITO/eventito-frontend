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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page({ tracks }) {
  const [trabajos, setTrabajos] = useState(tracks);

  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [nuevoRevisor, setNuevoRevisor] = useState({
    nombre: "",
    fechaLimite: "",
  });

  const handleRowClick = (trabajo) => {
    setTrabajoSeleccionado(trabajo);
  };

  const handleAddRevisor = () => {
    if (nuevoRevisor.nombre && nuevoRevisor.fechaLimite) {
      const updatedTrabajos = trabajos.map((trabajo) => {
        if (trabajo.id === trabajoSeleccionado.id) {
          return {
            ...trabajo,
            revisores: [
              ...trabajo.revisores,
              {
                id: Date.now(),
                nombre: nuevoRevisor.nombre,
                fechaLimite: new Date(nuevoRevisor.fechaLimite),
                revision: "",
              },
            ],
          };
        }
        return trabajo;
      });
      setTrabajos(updatedTrabajos);
      setTrabajoSeleccionado(
        updatedTrabajos.find((t) => t.id === trabajoSeleccionado.id),
      );
      setNuevoRevisor({ nombre: "", fechaLimite: "" });
    }
  };

  const handleSubmitDecision = (decision) => {
    const updatedTrabajos = trabajos.map((trabajo) => {
      if (trabajo.id === trabajoSeleccionado.id) {
        return {
          ...trabajo,
          estado: decision === "aceptar" ? "Aceptado" : "Rechazado",
        };
      }
      return trabajo;
    });
    setTrabajos(updatedTrabajos);
    setTrabajoSeleccionado(null);
  };

  if (trabajoSeleccionado) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-6xl">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setTrabajoSeleccionado(null);
          }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Lista de Trabajos
        </a>
        <h1 className="text-3xl font-bold mb-6">
          {trabajoSeleccionado.titulo}
        </h1>

        <Tabs defaultValue="revisiones" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="revisiones">Revisiones</TabsTrigger>
            <TabsTrigger value="revisores">Gestión de Revisores</TabsTrigger>
          </TabsList>
          <TabsContent value="revisiones">
            <Card>
              <CardHeader>
                <CardTitle>Revisiones del Trabajo</CardTitle>
                <CardDescription>
                  Revisa los comentarios de los revisores y toma una decisión
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trabajoSeleccionado.revisores.length > 0 ? (
                  trabajoSeleccionado.revisores.map((revisor) => (
                    <div key={revisor.id} className="mb-4 p-4 border rounded">
                      <h3 className="font-bold">{revisor.nombre}</h3>
                      <p className="text-sm text-gray-500">
                        Fecha límite:{" "}
                        {format(revisor.fechaLimite, "d 'de' MMMM 'de' yyyy", {
                          locale: es,
                        })}
                      </p>
                      <p className="mt-2">
                        {revisor.revision || "Revisión pendiente"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No hay revisiones disponibles aún.</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => handleSubmitDecision("rechazar")}
                  variant="destructive"
                >
                  Rechazar Trabajo
                </Button>
                <Button onClick={() => handleSubmitDecision("aceptar")}>
                  Aceptar Trabajo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="revisores">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Revisores</CardTitle>
                <CardDescription>
                  Añade o elimina revisores para este trabajo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Revisores Actuales</h3>
                    {trabajoSeleccionado.revisores.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {trabajoSeleccionado.revisores.map((revisor) => (
                          <li key={revisor.id}>
                            {revisor.nombre} - Fecha límite:{" "}
                            {format(
                              revisor.fechaLimite,
                              "d 'de' MMMM 'de' yyyy",
                              { locale: es },
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay revisores asignados aún.</p>
                    )}
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-bold mb-2">Añadir Nuevo Revisor</h3>
                    <div className="flex gap-4">
                      <Input
                        placeholder="Nombre del revisor"
                        value={nuevoRevisor.nombre}
                        onChange={(e) =>
                          setNuevoRevisor({
                            ...nuevoRevisor,
                            nombre: e.target.value,
                          })
                        }
                      />
                      <Input
                        type="date"
                        value={nuevoRevisor.fechaLimite}
                        onChange={(e) =>
                          setNuevoRevisor({
                            ...nuevoRevisor,
                            fechaLimite: e.target.value,
                          })
                        }
                      />
                      <Button onClick={handleAddRevisor}>Añadir Revisor</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Gestión de Tracks</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Fecha de Envío</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Categoría</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trabajos.map((trabajo) => (
            <TableRow
              key={trabajo.id}
              onClick={() => handleRowClick(trabajo)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{trabajo.titulo}</TableCell>
              <TableCell>
                {trabajo.autores.map((autor) => autor.nombre).join(", ")}
              </TableCell>
              <TableCell>
                {format(trabajo.fechaEnvio, "d MMM yyyy", { locale: es })}
              </TableCell>
              <TableCell>{trabajo.estado}</TableCell>
              <TableCell>{trabajo.categoria}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
