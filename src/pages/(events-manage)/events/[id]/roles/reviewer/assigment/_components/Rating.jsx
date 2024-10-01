import React from 'react'
import { cn } from '@/lib/utils'

export default function Rating({ value, onChange, max = 10 }) {
  const handleRatingClick = (rating) => {
    onChange(rating)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          className={cn(
            'w-10 h-10 rounded-lg border-2 font-semibold transition-all',
            value === rating
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-gray-200 bg-background hover:border-primary hover:bg-primary/10'
          )}
          onClick={() => handleRatingClick(rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  )
}
