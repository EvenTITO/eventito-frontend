import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Container } from './container'
import { BottomContainer } from './bottomContainer'
import { Button } from '@/components/ui/button'
import { addEventMandatory } from '@/state/events/createEventSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const eventStep2Schema = z.object({
  title: z.string().min(2, { message: 'Complete el título' }),
  description: z.string().min(1, { message: 'Complete la descripción' }),
  organizer: z.string().min(1, { message: 'Complete el organizador' }),
})

export default function CreateEventStep2({ step, setStep }) {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventStep2Schema),
  })

  const onSubmit = (data) => {
    dispatch(
      addEventMandatory({
        title: data.title,
        description: data.description,
        organized_by: data.organizer,
      })
    )
    setStep(3)
  }

  if (step === 2) {
    return (
      <>
        <Container>
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                Paso 2/3: Informacion general
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titulo</Label>
                  <Input
                    id="title"
                    {...register('title')}
                    placeholder="Ingresar titulo del evento"
                    maxLength={100}
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Descripcion</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Ingresar una descripcion corta del evento"
                    maxLength={1000}
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="organizer">Organizado por</Label>
                  <Input
                    id="organizer"
                    {...register('organizer')}
                    placeholder="Ingresar persona, grupo u organizacion a cargo del evento"
                    maxLength={100}
                  />
                  {errors.organizer && (
                    <p className="text-red-500">{errors.organizer.message}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Container>
        <BottomContainer>
          <Button variant="outline" onClick={() => setStep(1)}>
            Atras
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Siguiente
          </Button>
        </BottomContainer>
      </>
    )
  } else {
    return null
  }
}
