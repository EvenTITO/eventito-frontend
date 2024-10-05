import { useState } from 'react'
import Details from './_components/Details'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import InscriptionGroup from './_components/InscriptionGroup'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  APPROVED_STATUS,
  INSCRIPTION_STATUS_LABELS,
  PENDING_APPROVAL_STATUS,
  REJECTED_STATUS,
} from '@/lib/Constants'

export default function InscriptionsPage({ inscriptions }) {
  const [selectedInscription, setSelectedInscription] = useState(null)
  const [filterType, setFilterType] = useState('status')
  const [statusFilter, setStatusFilter] = useState('all')

  const groupedInscriptions = inscriptions.reduce((acc, inscription) => {
    const status = inscription.status || PENDING_APPROVAL_STATUS
    const hasPendingPayment = inscription.payments.some(
      (payment) => payment.status === PENDING_APPROVAL_STATUS
    )

    if (!acc[status]) {
      acc[status] = []
    }
    acc[status].push(inscription)

    if (hasPendingPayment) {
      if (!acc['PENDING_PAYMENTS']) {
        acc['PENDING_PAYMENTS'] = []
      }
      acc['PENDING_PAYMENTS'].push(inscription)
    }

    return acc
  }, {})

  function handleInscriptionClick(inscription) {
    setSelectedInscription(inscription)
  }

  function handleCloseDetails() {
    setSelectedInscription(null)
  }

  const renderFilteredInscriptions = () => {
    if (filterType === 'status') {
      if (statusFilter === 'all') {
        return Object.entries(groupedInscriptions).map(
          ([status, inscriptions]) =>
            status !== 'PENDING_PAYMENTS' && (
              <InscriptionGroup
                key={status}
                groupInscriptions={inscriptions}
                title={`Inscripciones ${INSCRIPTION_STATUS_LABELS[status].toLowerCase()}`}
                handleInscriptionClick={handleInscriptionClick}
              />
            )
        )
      } else {
        return (
          <InscriptionGroup
            groupInscriptions={groupedInscriptions[statusFilter] || []}
            title={`Inscripciones ${INSCRIPTION_STATUS_LABELS[statusFilter].toLowerCase()}`}
            handleInscriptionClick={handleInscriptionClick}
          />
        )
      }
    } else {
      return (
        <InscriptionGroup
          groupInscriptions={groupedInscriptions['PENDING_PAYMENTS'] || []}
          title="Inscripciones con pagos pendientes"
          handleInscriptionClick={handleInscriptionClick}
        />
      )
    }
  }

  return (
    <ContainerPage>
      <TitlePage title={'Inscripciones del evento'} />

      <div className="mb-6 flex justify-between items-center">
        <Tabs defaultValue="status" onValueChange={setFilterType}>
          <TabsList>
            <TabsTrigger value="status">Por estado</TabsTrigger>
            <TabsTrigger value="payments">Pagos pendientes</TabsTrigger>
          </TabsList>
        </Tabs>

        {filterType === 'status' && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value={PENDING_APPROVAL_STATUS}>
                Pendiente de aprobación
              </SelectItem>
              <SelectItem value={APPROVED_STATUS}>Aprobado</SelectItem>
              <SelectItem value={REJECTED_STATUS}>No aprobado</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {renderFilteredInscriptions()}

      {selectedInscription && (
        <Details
          inscription={selectedInscription}
          onClose={handleCloseDetails}
        />
      )}
    </ContainerPage>
  )
}
