import { CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MotionDiv } from '../../_components/Animation'

export default function Prices({ event }) {
  return (
    <MotionDiv className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Tarifas disponibles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {event.pricing.map((price, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{price.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-1xl font-bold mb-2">
                {price.value === 0 ? 'Gratuita' : '$' + price.value}
              </p>
              <p className="text-1xl mb-2">{price.description}</p>
              {price.related_date && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(price.related_date).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </MotionDiv>
  )
}
