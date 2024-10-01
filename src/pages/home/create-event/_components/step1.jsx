import { cn } from '@/lib/utils'
import { Container } from './container'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useDispatch } from 'react-redux'
import { addEventType } from '@/state/events/createEventSlice'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BottomContainer } from './bottomContainer'

const eventTypes = [
  {
    id: 'conference',
    title: 'Conferencia',
    description:
      'Evento de multiples dias, con charlas, presentaciones de trabajos, aprobacion de los mismos, etc',
  },
  {
    id: 'talk',
    title: 'Charla',
    description: 'Evento de un unico dia, con charlas.',
  },
]

export default function CreateEventStep1({ step, setStep }) {
  const [eventType, setEventType] = useState(null)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  function handleNext() {
    if (!eventType) {
      setError(true)
    } else {
      dispatch(addEventType(eventType))
      setStep(2)
    }
  }
  function handleSetEventType(idType) {
    setEventType(idType)
    setError(false)
  }

  if (step === 1) {
    return (
      <>
        <Container>
          <form className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Elegir un tipo de evento para continuar.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                Paso 1/3: Seleccionar el tipo de evento
              </h2>
              <div className="flex flex-col gap-4 sm:grid-cols-2">
                {eventTypes.map((type) => (
                  <div
                    key={type.id}
                    className={cn(
                      'p-4 border rounded-lg cursor-pointer transition-all',
                      eventType === type.id
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-primary'
                    )}
                    onClick={() => handleSetEventType(type.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          eventType === type.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-400'
                        )}
                      ></div>
                      <h3 className="font-semibold">{type.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Container>
        <BottomContainer>
          <Link to={'/home'}>
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="button" onClick={handleNext}>
            Siguiente
          </Button>
        </BottomContainer>
      </>
    )
  } else {
    return null
  }
}
