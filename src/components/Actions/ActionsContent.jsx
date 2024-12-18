import { cn } from '@/lib/utils'

export default function ActionsContent({ className, children }) {
  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      {children}
    </div>
  )
}
