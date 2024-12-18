import { useState } from 'react'
import Icon from '@/components/Icon'
import { Card, CardBody } from '@nextui-org/card'

export default function CardListContainer({ eventCards }) {
  const [idx, setIdx] = useState(0)
  const amountCardsPerPage = 3

  function handleLeft() {
    setIdx(idx - 1)
  }
  function handleRight() {
    setIdx(idx + 1)
  }

  return (
    <div className="relative w-full flex gap-4">
      {idx === 0 ? null : <ArrowCard icon="ArrowLeft" onPress={handleLeft} />}
      {eventCards
        .slice(
          idx * amountCardsPerPage,
          idx * amountCardsPerPage + amountCardsPerPage
        )
        .map((card) => (
          <div>{card}</div>
        ))}
      {idx * amountCardsPerPage + amountCardsPerPage < eventCards.length && (
        <ArrowCard icon="ArrowRight" onPress={handleRight} />
      )}
    </div>
  )
}

function ArrowCard({ icon, onPress }) {
  return (
    <Card
      isPressable
      onPress={onPress}
      className="overflow-hidden w-[125px] h-[250px] hover:bg-gray-50 hover:text-primary shadow-sm"
    >
      <div className="flex flex-col flex-grow p-6 w-full">
        <CardBody className="flex-grow items-center justify-center gap-2">
          <Icon name={icon} />
        </CardBody>
      </div>
    </Card>
  )
}
