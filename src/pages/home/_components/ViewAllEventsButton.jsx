import { Button } from '@nextui-org/button'
import Icon from '@/components/Icon'
import { useNavigator } from '@/lib/navigation'

export default function ViewAllEventsButton({ navigateTo }) {
  const navigator = useNavigator()

  return (
    <Button
      variant="light"
      endContent={<Icon name={'ArrowRight'} />}
      onClick={() => navigator.to(navigateTo)}
    >
      Ver todos
    </Button>
  )
}
