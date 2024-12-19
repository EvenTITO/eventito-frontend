import CardWithFocus from '@/components/Card/CardWithFocus'
import { useNavigator } from '@/lib/navigation'

export default function GoToReviewFormCard() {
  const navigator = useNavigator()

  return (
    <CardWithFocus
      nameIcon="BookOpenText"
      onClick={() => navigator.replace('tracks', 'reviews')}
    >
      <div className="flex-grow">
        <h2 className="text-sm font-medium text-foreground">
          Formulario de revisión general del evento
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Haz clic para ver y configurar el formulario que deberá completar cada
          revisor para evaluar un trabajo presentado
        </p>
      </div>
    </CardWithFocus>
  )
}
