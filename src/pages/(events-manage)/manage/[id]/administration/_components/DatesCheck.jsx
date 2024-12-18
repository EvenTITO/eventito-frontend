import CardsStatus, { RowWithCheck } from './CardsStatus'

export default function DatesCheck({ dates }) {
  return (
    <CardsStatus
      title="Fechas importantes"
      rows={[
        <RowWithCheck title={'Fecha de comienzo'} value={dates[0]} />,
        <RowWithCheck title={'Fecha de fin'} value={dates[1]} />,
        <RowWithCheck
          title={'Fecha de límite de envío de trabajos'}
          value={dates[2]}
        />,
      ]}
    />
  )
}
