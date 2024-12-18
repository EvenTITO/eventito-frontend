import InscriptionRoleSelector from '@/components/Forms/InscriptionRoleSelector'
import LabelForm from '@/components/Forms/LabelForm'
import FullModal from '@/components/Modal/FullModal'
import { useState } from 'react'

export default function RegistrationForm({ trigger, eventTitle }) {
  const [role, setRole] = useState(null)

  return (
    <FullModal
      trigger={trigger}
      title={'Inscripción al evento ' + eventTitle}
      onSubmit={() => alert('ok')}
      isPending={false}
      submitButtonText={'Finalizar inscripción'}
    >
      <InscriptionRoleSelector
        label={<LabelForm label="Seleccionar el rol en el evento" isRequired />}
        role={role}
        setRole={setRole}
        speakerDisabled={false}
      />
    </FullModal>
  )
}
