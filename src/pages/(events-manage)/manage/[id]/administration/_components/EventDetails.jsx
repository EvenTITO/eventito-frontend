import CardsStatus, { RowWithTitleAndText } from './CardsStatus'

export default function EventDetails({
  eventStatus,
  worksStatus,
  inscriptions,
}) {
  return (
    <CardsStatus
      title="Detalles del evento"
      rows={[
        <RowWithTitleAndText title={'Estado'} text={eventStatus} />,
        <RowWithTitleAndText
          title={'Recepción de trabajos'}
          text={worksStatus}
        />,
        <RowWithTitleAndText
          title={'Asistentes confirmados'}
          text={inscriptions.attendees}
          isLoading={inscriptions.isPending}
        />,
      ]}
    />
  )
}
