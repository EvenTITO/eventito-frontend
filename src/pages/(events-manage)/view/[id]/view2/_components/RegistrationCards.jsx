import CardWithFocus from '@/components/Card/CardWithFocus'
import { format } from '@formkit/tempo'

export default function RegistrationCards({startDate, submissionLimit}) {
  return (
    <div>
      <RegistrationCard
        open={{
          title: 'Inscripciones abiertas para asistir al evento',
          description: 'Haz click para ir al formulario de inscripción',
        }}
        close={{
          title: 'Inscripciones cerradas para asistir al evento',
        }}
        isOpen={new Date() < startDate}
        limitDate={startDate}
      />
      <RegistrationCard
        open={{
          title: 'Perído de presentación de trabajos abierto',
          description: 'Haz click para ir al formulario de inscripción',
        }}
        close={{
          title: 'Período de presentación de trabajos cerrado',
        }}
        limitDate={submissionLimit}
        isOpen={new Date() < submissionLimit}
      />
    </div>
  )
}

function RegistrationCard({ open, close, isOpen, limitDate }) {
  return (
    <CardWithFocus
      onClick={() => alert('ok')}
      rightComponent={<LimitDate limitDate={limitDate} isOpen={isOpen} />}
    >
      <div className="flex-grow">
        <h2 className="text-lg font-medium text-foreground">
          {isOpen ? open.title : close.title}
        </h2>
        <p className="text-lg text-muted-foreground italic">
          {isOpen ? open.description : null}
        </p>
      </div>
    </CardWithFocus>
  )
}

function LimitDate({ limitDate, isOpen }) {
  if (isOpen) {
    return <p className="text-gray-500">Fecha límite: {format(limitDate)}</p>
  }

  return <p className="text-gray-500">Cerró: {format(limitDate)}</p>
}