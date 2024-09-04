import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

const roles = [
  {
    id: "attendee",
    title: "Asistente",
    description: "Asistir al evento para escuchar charlas",
  },
  { id: "author", title: "Autor", description: "Presentar uno o más trabajos en el evento" },
  { id: "attendee-author", title: "Asistente y autor", description: "Asistir a charlas y presentar trabajos" },
];

export default function EventRegistrationPage() {
  const [role, setRole] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [file, setFile] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkScrollable = () => {
      const content = document.getElementById("form-content");
      if (content) {
        setIsScrollable(content.scrollHeight > window.innerHeight - 200);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Seleccionar un rol para continuar");
      return;
    }

    console.log({ role, affiliation, file });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Registro al evento</h1>
          <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>

          <form id="form-content" onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Seleccionar tu actividad en el evento</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {roles.map((roleOption) => (
                  <div
                    key={roleOption.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-all",
                      role === roleOption.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-primary",
                    )}
                    onClick={() => setRole(roleOption.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2",
                          role === roleOption.id
                            ? "border-primary bg-primary"
                            : "border-gray-400",
                        )}
                      ></div>
                      <h3 className="font-semibold">{roleOption.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {roleOption.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                Detalles de filiación (Opcional)
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="affiliation">Filiación</Label>
                  <Input
                    id="affiliation"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    placeholder="Ingresá tu filiación"
                  />
                </div>
                <div>
                  <Label htmlFor="file-upload">Archivo de filiación</Label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <Upload className="h-4 w-4 inline-block mr-2" />
                      Seleccionar archivo
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                    <span className="ml-3 text-sm text-gray-500">
                      {file ? file.name : "Ningún archivo seleccionado"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
          <Link href="/events">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" form="form-content">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
