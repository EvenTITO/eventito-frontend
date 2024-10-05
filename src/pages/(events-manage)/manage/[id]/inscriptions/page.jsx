import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'
import Details from './_components/Details'

export default function InscriptionsPage({ inscriptions }) {
  const [selectedInscription, setSelectedInscription] = useState(null)

  const groupedInscriptions = inscriptions.reduce(
    (acc, inscription) => {
      const hasPendingApproval = inscription.payments.some(
        (payment) => payment.status === 'PENDING_APPROVAL'
      )
      const key = hasPendingApproval ? 'pending' : 'approved'
      acc[key].push(inscription)
      return acc
    },
    { pending: [], approved: [] }
  )

  function handleInscriptionClick(inscription) {
    setSelectedInscription(inscription)
  }

  function handleCloseDetails() {
    setSelectedInscription(null)
  }

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-6">Inscripciones del evento</h1>
      {renderInscriptionGroup(
        groupedInscriptions.pending,
        'Inscripciones con pagos pendientes de revisión',
        handleInscriptionClick
      )}
      {renderInscriptionGroup(
        groupedInscriptions.approved,
        'Inscripciones aceptadas',
        handleInscriptionClick
      )}
      {selectedInscription && (
        <Details
          inscription={selectedInscription}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  )
}

const renderInscriptionGroup = (
  groupInscriptions,
  title,
  handleInscriptionClick
) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">
      {groupInscriptions.map((inscription) => (
        <Card
          key={inscription.id}
          className="cursor-pointer hover:shadow-md transition-shadow duration-200"
          onClick={() => handleInscriptionClick(inscription)}
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
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
                <h3 className="font-medium">{inscription.userName}</h3>
                <p className="text-sm text-gray-500">{inscription.userEmail}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Badge
                variant={
                  inscription.payments.some(
                    (p) => p.status === 'PENDING_APPROVAL'
                  )
                    ? 'warning'
                    : 'success'
                }
              >
                {
                  inscription.payments.filter(
                    (p) => p.status === 'PENDING_APPROVAL'
                  ).length
                }{' '}
                pendientes
              </Badge>
              <ChevronRight className="ml-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)
