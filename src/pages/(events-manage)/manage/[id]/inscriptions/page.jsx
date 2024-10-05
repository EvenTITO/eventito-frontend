import { useState } from 'react'
import Details from './_components/Details'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import InscriptionGroup from './_components/InscriptionGroup'

export default function InscriptionsPage({ inscriptions }) {
  const [selectedInscription, setSelectedInscription] = useState(null)

  const groupedInscriptions = inscriptions.reduce(
    (acc, inscription) => {
      const hasPendingApproval = inscription.payments.some(
        (payment) => payment.status === 'PENDING_APPROVAL'
      )
      let key = 'pending'
      if (!hasPendingApproval && inscriptions.payments?.length > 0) {
        key = 'approved'
      } else if (!hasPendingApproval) {
        key = 'withoutPayments'
      }
      acc[key].push(inscription)
      return acc
    },
    { pending: [], approved: [], withoutPayments: [] }
  )

  function handleInscriptionClick(inscription) {
    console.log(inscription.payments)
    setSelectedInscription(inscription)
  }

  function handleCloseDetails() {
    setSelectedInscription(null)
  }

  return (
    <ContainerPage>
      <TitlePage title={'Inscripciones del evento'} />

      <InscriptionGroup
        groupInscriptions={groupedInscriptions.pending}
        title={'Inscripciones con pagos pendientes de revisión'}
        handleInscriptionClick={handleInscriptionClick}
      />
      <InscriptionGroup
        groupInscriptions={groupedInscriptions.approved}
        title={'Inscripciones con pagos aceptados'}
        handleInscriptionClick={handleInscriptionClick}
      />
      <InscriptionGroup
        groupInscriptions={groupedInscriptions.withoutPayments}
        title={'Inscripciones sin pagos asociados'}
        handleInscriptionClick={handleInscriptionClick}
      />
      {selectedInscription && (
        <Details
          inscription={selectedInscription}
          onClose={handleCloseDetails}
        />
      )}
    </ContainerPage>
  )
}
