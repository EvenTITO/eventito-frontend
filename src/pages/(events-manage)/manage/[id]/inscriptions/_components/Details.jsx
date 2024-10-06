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
import { Download, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  APPROVED_STATUS,
  REJECTED_STATUS,
  PENDING_APPROVAL_STATUS,
  UNCOMPLETED_STATUS,
  INSCRIPTION_STATUS_LABELS,
  INSCRIPTION_STATUS_LABELS_REVERSE,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_LABELS_REVERSE,
  INSCRIPTION_ROLES_LABELS,
} from '@/lib/Constants'

export default function Details({ inscription, onClose }) {
  const [isOpen, setIsOpen] = useState(true)
  const [payments, setPayments] = useState(inscription.payments)
  const [status, setStatus] = useState(
    inscription.status || PENDING_APPROVAL_STATUS
  )

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleDownloadReceipt = (paymentId) => {
    // TODO
  }

  const handleChangePaymentStatus = (paymentId, newStatus) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: newStatus } : payment
      )
    )
  }

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus)
  }

  const statusColors = {
    [PENDING_APPROVAL_STATUS]: 'bg-yellow-100 text-yellow-800',
    [APPROVED_STATUS]: 'bg-green-100 text-green-800',
    [REJECTED_STATUS]: 'bg-red-100 text-red-800',
  }

  const hasPayments = payments && payments.length > 0

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`sm:max-w-[90%] ${hasPayments ? 'h-[90vh]' : 'max-h-[80vh]'} overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles de la inscripción
          </DialogTitle>
        </DialogHeader>
        <div className={`grid gap-6 ${hasPayments ? '' : 'items-center'}`}>
          <div
            className={`flex ${hasPayments ? 'items-start' : 'items-center'} justify-between`}
          >
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
                        {INSCRIPTION_ROLES_LABELS[role] || role}
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
                    {INSCRIPTION_STATUS_LABELS[status]}{' '}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {Object.entries(INSCRIPTION_STATUS_LABELS).map(
                    ([key, value]) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => handleChangeStatus(key)}
                      >
                        {value}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {hasPayments && (
            <>
              <Separator />
              <div>
                <h3 className="text-xl font-semibold mb-4">Pagos</h3>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <Card key={payment.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>{payment.name}</span>
                          <div>
                            <p className="text-sm font-normal text-gray-500 mb-2">
                              Estado del pago
                            </p>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`${statusColors[payment.status]} px-4 py-2 rounded-full`}
                                >
                                  {PAYMENT_STATUS_LABELS[payment.status]}{' '}
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {Object.entries(PAYMENT_STATUS_LABELS).map(
                                  ([key, value]) => (
                                    <DropdownMenuItem
                                      key={key}
                                      onClick={() =>
                                        handleChangePaymentStatus(
                                          payment.id,
                                          key
                                        )
                                      }
                                    >
                                      {value}
                                    </DropdownMenuItem>
                                  )
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
