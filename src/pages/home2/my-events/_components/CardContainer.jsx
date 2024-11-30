import { Card } from '@nextui-org/card'

export default function CardContainer({ onPress, children }) {
  return (
    <Card
      isPressable
      onPress={onPress}
      className="overflow-hidden w-[350px] h-[250px] hover:bg-gray-50 hover:text-primary"
    >
      {children}
    </Card>
  )
}

