import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export default function ConfirmFreeEventDialog({ onConfirm }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          Hacer evento gratuito
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar evento gratuito</DialogTitle>
          <DialogDescription>
            Se creará una tarifa gratuita tanto para autores como para
            asistentes, que luego se podrá configurar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" className="mr-2">
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
