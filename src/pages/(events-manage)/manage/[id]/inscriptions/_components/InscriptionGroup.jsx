import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronRight } from 'lucide-react'

export default function InscriptionGroup({
  groupInscriptions,
  title,
  handleInscriptionClick,
}) {
  return (
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
                  <p className="text-sm text-gray-500">
                    {inscription.userEmail}
                  </p>
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
}
