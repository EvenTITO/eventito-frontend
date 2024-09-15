import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  PlusIcon,
} from "lucide-react";
import { format } from "date-fns";

export default function Page() {
  const [activeTab, setActiveTab] = useState("registro");
  const [isEditing, setIsEditing] = useState(false);
  const [registration, setRegistration] = useState({
    role: "Asistente",
    name: "John Doe",
    affiliation: "FIUBA",
    file: null,
  });
  const [error, setError] = useState("");
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: new Date(2023, 5, 15),
      status: "Confirmado",
      name: "Tarifa de alumno regular",
      amount: 150,
      works: [
        { id: 1, title: "Advancements in Quantum Computing" },
        { id: 2, title: "AI in Healthcare: A Comprehensive Review" },
      ],
    },
    {
      id: 2,
      date: new Date(2023, 5, 20),
      status: "Pendiente",
      name: "Tarifa gratuita de profesores",
      amount: 0,
      works: [{ id: 3, title: "Blockchain in Supply Chain Management" }],
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  const handleSave = () => {
    if (!registration.name) {
      setError("Por favor completar todos los campos.");
      return;
    }
    setIsEditing(false);
    setError("");
    console.log("Saving updated registration:", registration);
  };

  const handleInputChange = (field, value) => {
    setRegistration((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRegistration((prev) => ({ ...prev, file }));
    }
  };

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const confirmedAmount = payments.reduce(
    (sum, payment) =>
      payment.status === "Confirmado" ? sum + payment.amount : sum,
    0,
  );

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Mi inscripcion</h1>

      <div className="mb-8">
        <div className="flex border-b">
          {["Registro", "Pagos"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.toLowerCase()
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "registro" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Detalles de registro</h2>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              {isEditing ? (
                <Select
                  value={registration.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asistente">Asistente</SelectItem>
                    <SelectItem value="Autor">Autor</SelectItem>
                    <SelectItem value="Asistente y autor">
                      Asistente y autor
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 bg-gray-100 rounded-md">
                  {registration.role}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="affiliation">Filiacion (Opcional)</Label>
              {isEditing ? (
                <Input
                  id="affiliation"
                  value={registration.affiliation}
                  onChange={(e) =>
                    handleInputChange("affiliation", e.target.value)
                  }
                  placeholder="Ingresa tu filiacion"
                />
              ) : (
                <div className="p-2 bg-gray-100 rounded-md">
                  {registration.affiliation || "Not provided"}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="space-y-2">
                <Label htmlFor="file-upload">
                  Comprobante de filiacion (Opcional)
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Elegir archivo
                  </Button>
                  <span className="text-sm text-gray-500">
                    {registration.file
                      ? registration.file.name
                      : "Ningun archivo seleccionado"}
                  </span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>Guardar</Button>
              </>
            ) : (
              <Button onClick={handleEdit} variant="outline">
                Editar
              </Button>
            )}
          </div>
        </div>
      )}

      {activeTab === "pagos" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Mis pagos</h2>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Cargar nuevo pago
            </Button>
          </div>
          {payments.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold mb-2">
                Ningun pago cargado
              </h2>
              <p className="text-gray-500 mb-4">
                Agregar un nuevo para para visualizarlo
              </p>
              <Button>Agrega tu primer pago</Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha de pago</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Tarifa pagada</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Trabajos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge className={"bg-gray-500"}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {payment.name}
                    </TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      {payment.works.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {payment.works.map((work) => (
                            <li key={work.id}>{work.title}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">
                          Sin trabajos asociados
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
