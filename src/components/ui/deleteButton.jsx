import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from './button'

export function DeleteButton({ className, text, onClick, type, disabled }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={className}
      type={type}
      disabled={disabled}
    >
      <X className="h-4 w-4" />
      {text}
    </Button>
  )
}
