import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const { value, maxLength } = props
  console.log('el value es', value)
  console.log('props es', props)
  return (
    <>
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
          'focus-visible:eventitoBlue',
          'hover:border hover:border-eventitoBlue',
          className
        )}
        ref={ref}
        onChange={(e) => {
          // Call the onChange function provided by react-hook-form
          props.onChange(e)
        }}
        {...props}
      />
      {maxLength && value?.length > 0.9 * maxLength && (
        <p className="text-sm text-gray-500">
          {value.length}/{maxLength}
        </p>
      )}
    </>
  )
})
Input.displayName = 'Input'

export { Input }
