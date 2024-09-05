import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

const tarifas = [
  {
    id: "basica",
    titulo: "Tarifa Básica",
    descripcion: "Acceso a eventos principales",
    precio: "100",
  },
  {
    id: "estandar",
    titulo: "Tarifa Estándar",
    descripcion: "Acceso a eventos principales y talleres",
    precio: "200",
  },
  {
    id: "premium",
    titulo: "Tarifa Premium",
    descripcion: "Acceso completo a todos los eventos y áreas VIP",
    precio: "300",
  },
  {
    id: "estudiante",
    titulo: "Tarifa Estudiante",
    descripcion: "Descuento especial para estudiantes",
    precio: "50",
  },
  {
    id: "grupal",
    titulo: "Tarifa Grupal",
    descripcion: "Descuento para grupos de 5 o más personas",
    precio: "80",
  },
];

export default function NewPaymentPage() {
  const [tarifa, setTarifa] = useState("");
  const [comprobante, setComprobante] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [error, setError] = useState("");
  const [etapa, setEtapa] = useState(1);

  useEffect(() => {
    const checkScrollable = () => {
      const content = document.getElementById("form-content");
      if (content) {
        setIsScrollable(content.scrollHeight > window.innerHeight - 200); // 200px para encabezado y botones
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (etapa === 1 && !tarifa) {
      setError("Por favor, seleccione una tarifa");
      return;
    }

    if (etapa === 2 && !comprobante) {
      setError("Por favor, cargue el comprobante de pago");
      return;
    }

    if (etapa === 1) {
      setEtapa(2);
    } else {
      // Aquí manejarías el envío final del formulario
      console.log({ tarifa, comprobante });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setComprobante(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Proceso de Pago</h1>
          <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>

          <form id="form-content" onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {etapa === 1 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Seleccione su Tarifa
                </h2>
                <div className="flex flex-col space-y-4">
                  {tarifas.map((tarifaOpcion) => (
                    <div
                      key={tarifaOpcion.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        tarifa === tarifaOpcion.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary",
                      )}
                      onClick={() => setTarifa(tarifaOpcion.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2",
                            tarifa === tarifaOpcion.id
                              ? "border-primary bg-primary"
                              : "border-gray-400",
                          )}
                        ></div>
                        <h3 className="font-semibold">{tarifaOpcion.titulo}</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {tarifaOpcion.descripcion}
                      </p>
                      <p className="mt-1 text-sm font-semibold">
                        Precio: ${tarifaOpcion.precio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {etapa === 2 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Carga de Comprobante de Pago
                </h2>
                <div>
                  <Label htmlFor="file-upload">Subir Comprobante</Label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <Upload className="h-4 w-4 inline-block mr-2" />
                      Elegir archivo
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <span className="ml-3 text-sm text-gray-500">
                      {comprobante
                        ? comprobante.name
                        : "Ningún archivo seleccionado"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <div
        className={cn(
          "py-4 bg-background",
          isScrollable ? "fixed bottom-0 left-0 right-0" : "",
        )}
      >
        <div className="container mx-auto px-4 max-w-3xl flex justify-between">
          {etapa === 1 ? (
            <Link href="/eventos">
              <Button variant="outline">Cancelar</Button>
            </Link>
          ) : (
            <Button variant="outline" onClick={() => setEtapa(1)}>
              Atrás
            </Button>
          )}
          <Button type="submit" form="form-content">
            {etapa === 1 ? "Siguiente" : "Finalizar Pago"}
          </Button>
        </div>
      </div>
    </div>
  );
}
