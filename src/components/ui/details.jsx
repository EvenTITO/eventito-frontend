import { BadgeCheck } from 'lucide-react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function DetailsHeader({ event }) {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>Del 10 al 15 de noviembre</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl">Descripción General</h2>
          {event.description}
        </CardContent>
      </Card>
    </main>
  )
}
