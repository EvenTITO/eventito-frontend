import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import './styles.css'

export default function PrimaryButton({ children, onClick, className }) {
  return (
    <Button
      className={cn('bg-blue-600 hover:bg-blue-700', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
