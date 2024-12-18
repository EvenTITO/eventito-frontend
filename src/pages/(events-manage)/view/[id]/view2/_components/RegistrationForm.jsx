import FiliationInput from '@/components/Forms/FiliationInput'
import InscriptionRoleSelector from '@/components/Forms/InscriptionRoleSelector'
import LabelForm from '@/components/Forms/LabelForm'
import FullModal from '@/components/Modal/FullModal'
import { useState } from 'react'

export default function RegistrationForm({
  trigger,
  eventTitle,
  speakerDisabled,
}) {
  const [role, setRole] = useState(null)
  const [filiation, setFiliation] = useState(null)
  const [filiationFile, setFiliationFile] = useState(null)

  return (
    <FullModal
      trigger={trigger}
      title={'Inscripción al evento ' + eventTitle}
      onSubmit={() => alert(role)}
      isPending={false}
      submitButtonText={'Finalizar inscripción'}
    >
      <InscriptionRoleSelector
        label={<LabelForm label="Seleccionar el rol en el evento" isRequired />}
        role={role}
        setRole={setRole}
        speakerDisabled={speakerDisabled}
      />
      <FiliationInput
        label={<LabelForm label="En caso de tener, ingresar una filiación" />}
        filiation={filiation}
        setFiliation={setFiliation}
        filiationFile={filiationFile}
        setFiliationFile={setFiliationFile}
      />
    </FullModal>
  )
}
