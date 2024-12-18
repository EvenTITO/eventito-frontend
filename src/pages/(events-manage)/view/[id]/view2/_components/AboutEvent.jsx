import TitlePage from '@/pages/(events-manage)/_components/titlePage'

export default function AboutEvent({ description }) {
  return (
    <div>
      <TitlePage title="Acerca del evento" />
      {description}
    </div>
  )
}
