import CardWithFocus from '@/components/Card/CardWithFocus'
import { format } from '@formkit/tempo'

export default function RegistrationCard({ open, close, isOpen, limitDate }) {
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
