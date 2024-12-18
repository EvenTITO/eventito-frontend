import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from '@formkit/tempo'

export default function Prices({ prices }) {
  const [validPrices, setValidPrices] = useState([])

  useEffect(() => {
    const today = new Date()
    const filteredPrices = prices.filter(
      (price) => !price.related_date || new Date(price.related_date) >= today
    )
    setValidPrices(filteredPrices)
  }, [prices])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {validPrices.map((price, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{price.name}</CardTitle>
            <CardDescription>{price.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            <div className="text-3xl font-bold mb-4">
              ${price.value.toFixed(2)}
            </div>
            {price.related_date && (
              <Badge variant="secondary" className="self-start">
                Válido hasta: {format(price.related_date, 'short')}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
