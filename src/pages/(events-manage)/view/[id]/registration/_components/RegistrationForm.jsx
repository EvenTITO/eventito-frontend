import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";
import { MotionDiv } from "../../_components/Animation";
import { useSubmitRegistration } from "@/hooks/events/registrationHooks";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { REGISTRATION_ROLES } from "@/lib/Constants";

const schema = z.object({
  role: z.string().min(1, { message: "Seleccionar un rol para continuar" }),
  affiliation: z.string().optional(),
  file: z.any().optional(),
});

export default function RegistrationForm() {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    mutateAsync: submitRegistration,
    isPending,
    error: submitError,
  } = useSubmitRegistration();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    await submitRegistration({ registrationData: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <MotionDiv className="space-y-4">
        {(errors.root || submitError) && (
          <Alert variant="destructive">
            <AlertDescription>
              {errors.root?.message || submitError?.message}
            </AlertDescription>
          </Alert>
        )}

        <MotionDiv className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            Seleccionar tu actividad en el evento
            {errors.role && (
              <>
                <span className="text-red-500 ml-2" aria-label="required">
                  *
                </span>
                <span
                  className="text-red-500 ml-2 text-base"
                  aria-label="required"
                >
                  completar este campo para continuar
                </span>
              </>
            )}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  {REGISTRATION_ROLES.map((roleOption) => (
                    <div
                      key={roleOption.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all",
                        field.value === roleOption.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary",
                      )}
                      onClick={() => field.onChange(roleOption.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2",
                            field.value === roleOption.id
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
                </>
              )}
            />
          </div>
        </MotionDiv>

        <MotionDiv className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">
            Detalles de filiación (Opcional)
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="affiliation">Filiación</Label>
              <Input
                id="affiliation"
                {...register("affiliation")}
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
        </MotionDiv>
      </MotionDiv>
      <MotionDiv>
        <ButtonWithLoading
          isLoading={isPending}
          type="submit"
          className="w-full"
        >
          Finalizar registro
        </ButtonWithLoading>
      </MotionDiv>
    </form>
  );
}
