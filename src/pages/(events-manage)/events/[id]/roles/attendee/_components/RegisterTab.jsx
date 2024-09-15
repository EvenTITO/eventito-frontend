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
import { Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterTab({ error }) {
  const [isEditing, setIsEditing] = useState(false);
  const [registration, setRegistration] = useState(userRegistration);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Datos de inscripción</span>
          <EditInscriptionButton
            isEditing={isEditing}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Participación elegida</Label>
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
                {registration.affiliation || "-"}
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
      </CardContent>
    </Card>
  );
}

function EditInscriptionButton({
  isEditing,
  handleEdit,
  handleCancel,
  handleSave,
}) {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar</Button>
      </div>
    );
  }

  return (
    <Button onClick={handleEdit} variant="outline">
      Editar
    </Button>
  );
}

const userRegistration = {
  role: "Asistente",
  name: "John Doe",
  affiliation: "FIUBA",
  file: null,
};
