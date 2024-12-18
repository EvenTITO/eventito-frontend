import FullModal from '@/components/Modal/FullModal'

export default function RegistrationForm({ trigger, eventTitle }) {
  return (
    <FullModal
      trigger={trigger}
      title={'Inscripción al evento ' + eventTitle}
      onSubmit={() => alert('ok')}
      isPending={false}
    >
      Elegir rol
    </FullModal>
  )
}
