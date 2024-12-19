import TitlePage from '@/pages/(events-manage)/_components/titlePage'

export default function AboutEvent({ description }) {
  return (
    <div>
      <TitlePage title="Acerca del evento" />
      <p className='text-lg'>{description}</p>
    </div>
  )
}
