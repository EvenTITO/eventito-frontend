import Icon from '@/components/Icon'
import { SkeletonText } from '@/components/Skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { format } from '@formkit/tempo'

export default function CardsStatus({ title, rows }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rows.map((row, idx) => (
          <>
            {row}
            {idx < 2 ? <Separator /> : null}
          </>
        ))}
      </CardContent>
    </Card>
  )
}

export function RowWithTitleAndText({ title, text, isLoading = false }) {
  return (
    <div className="flex items-center justify-between text-sm font-medium">
      <span>{title}</span>
      {isLoading ? <SkeletonText /> : <span>{text}</span>}
    </div>
  )
}

export function RowWithCheck({ title, value }) {
  return (
    <div className="flex items-center justify-between text-sm font-medium">
      <span>{title}</span>
      {value ? (
        <p>{format(value, 'short')}</p>
      ) : (
        <Icon name="CircleX" classNames={'text-red-500'} />
      )}
    </div>
  )
}
