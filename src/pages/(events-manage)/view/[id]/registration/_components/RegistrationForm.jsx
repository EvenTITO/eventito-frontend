import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn, getEventId } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload } from 'lucide-react'
import { MotionDiv } from '../../_components/Animation'
import { useSubmitInscription } from '@/hooks/events/attendeeHooks'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { REGISTRATION_ROLES, MIN_AFFILIATION_NAME } from '@/lib/Constants'
import { toast, useToast } from '@/hooks/use-toast.js'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  role: z.string().min(1, { message: 'Seleccionar un rol para continuar' }),
  affiliation: z.string().optional(),
  file: z.any().optional(),
})

export default function RegistrationForm() {
  const [file, setFile] = useState(null)
  const [activityEnable, setActivityEnable] = useState(false)
  const [affiliationNameLength, setAffiliationNameLength] = useState(0)

  const { toast } = useToast()

  const eventId = getEventId()
  const navigate = useNavigate()

  function enableButton(){
    if(activityEnable){
      if(affiliationNameLength > MIN_AFFILIATION_NAME){
        return !!file
      } else {
        return !(affiliationNameLength > 0) && !file
      }
    }
    return false
  }

  function handleAffiliationEnable(e){
    setAffiliationNameLength(e.target.value.length)
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const {
    mutateAsync: submitRegistration,
    isPending,
    error: submitError,
  } = useSubmitInscription()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async (data) => {
    const inscriptionData = {
      ...data,
      file: file,
      roles: data.role.split(','),
    }
    await submitRegistration({ inscriptionData })
    navigate(`/events/${eventId}/view`)
  }

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
                        'p-4 border rounded-lg cursor-pointer transition-all',
                        field.value === roleOption.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary'
                      )}
                      onClick={() => {
                        field.onChange(roleOption.id)
                        setActivityEnable(true)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            'w-4 h-4 rounded-full border-2',
                            field.value === roleOption.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-400'
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
                {...register('affiliation')}
                placeholder="Ingresá tu filiación"
                onChange={handleAffiliationEnable}
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
                  {file ? file.name : 'Ningún archivo seleccionado'}
                </span>
              </div>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
      <MotionDiv>
        <ButtonWithLoading
          isLoading={isPending}
          disabled={!enableButton()}
          type="submit"
          className="w-full"
        >
          Finalizar registro
        </ButtonWithLoading>
      </MotionDiv>
    </form>
  )
}
