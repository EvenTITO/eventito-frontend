import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

export default function ContainerAdminPage({
  title,
  subtitle,
  icon,
  className,
  children,
}) {
  const IconComponent = Icons[icon]
  return (
    <div
      className={cn('max-w-6xl mx-auto p-8 bg-white min-h-screen', className)}
    >
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <IconComponent className="h-10 w-10 text-primary" />
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
      </div>

      {children}
    </div>
  )
}
