import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Download, Check, X, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Details({ inscription, onClose }) {
  const [isOpen, setIsOpen] = useState(true)
  const [payments, setPayments] = useState(inscription.payments)
  const [status, setStatus] = useState(inscription.status || 'PENDING_APPROVAL')

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleDownloadReceipt = (paymentId) => {
    // Implement the download logic here
    console.log(`Downloading receipt for payment ${paymentId}`)
  }

  const handleApprovePayment = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'APPROVED' } : payment
      )
    )
  }

  const handleDisapprovePayment = (paymentId) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? { ...payment, status: 'NOT_APPROVED' }
          : payment
      )
    )
  }

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus)
    // Here you would typically update the status on the server
    console.log(`Updating inscription status to ${newStatus}`)
  }

  const statusColors = {
    PENDING_APPROVAL: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    NOT_APPROVED: 'bg-red-100 text-red-800',
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[90%] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles de la inscripción
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${inscription.userName}`}
                />
                <AvatarFallback>
                  {inscription.userName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{inscription.userName}</h2>
                <p className="text-gray-500">{inscription.userEmail}</p>
                <p className="text-gray-500">{inscription.affiliation}</p>
                {inscription.roles && inscription.roles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {inscription.roles.map((role, index) => (
                      <Badge key={index} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-2">
                Estado de la inscripción
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${statusColors[status]} px-4 py-2 rounded-full`}
                  >
                    {status} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleChangeStatus('APPROVED')}
                  >
                    APPROVED
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleChangeStatus('NOT_APPROVED')}
                  >
                    NOT APPROVED
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleChangeStatus('PENDING_APPROVAL')}
                  >
                    PENDING APPROVAL
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          {payments && payments.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold mb-4">Pagos</h3>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{payment.name}</span>
                        <Badge
                          variant={
                            payment.status === 'PENDING_APPROVAL'
                              ? 'warning'
                              : payment.status === 'APPROVED'
                                ? 'success'
                                : 'destructive'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-2">
                        Fecha: {new Date(payment.date).toLocaleDateString()}
                      </p>
                      {payment.works && payment.works.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">
                            Trabajos relacionados:
                          </h4>
                          <ul className="list-disc pl-5">
                            {payment.works.map((work, index) => (
                              <li key={index} className="text-sm">
                                {work.title} ({work.track})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Descargar
                          comprobante
                        </Button>
                        {payment.status === 'PENDING_APPROVAL' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePayment(payment.id)}
                            >
                              <Check className="mr-2 h-4 w-4" /> Aprobar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDisapprovePayment(payment.id)
                              }
                            >
                              <X className="mr-2 h-4 w-4" /> Rechazar
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Esta inscripción no tiene pagos asociados.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
