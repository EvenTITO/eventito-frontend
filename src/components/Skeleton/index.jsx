import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'

export function SkeletonList({ amountCards = 3 }) {
  const cards = [...Array(amountCards).keys()]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
      {cards.map((card) => (
        <SkeletonCard key={card} />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  )
}

export function SkeletonText() {
  return (
    <Skeleton className="w-2/5 rounded-lg">
      <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
    </Skeleton>
  )
}

export function SkeletonTable() {
  return (
    <Card className="w-full p-4" radius="lg">
      <div className="space-y-4">
        <div className="flex space-x-4">
          {[...Array(1)].map((_, index) => (
            <Skeleton
              key={`header-${index}`}
              className="h-8 flex-1 rounded-lg"
            />
          ))}
        </div>

        {[...Array(1)].map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-4">
            {[...Array(1)].map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-12 flex-1 rounded-lg"
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}
