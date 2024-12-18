import FiliationInput from '@/components/Forms/FiliationInput'
import InscriptionRoleSelector from '@/components/Forms/InscriptionRoleSelector'
import LabelForm from '@/components/Forms/LabelForm'
import FullModal from '@/components/Modal/FullModal'
import { useSubmitInscription } from '@/hooks/events/attendeeHooks'
import { useNavigator } from '@/lib/navigation'
import { sleep } from '@/lib/utils'
import { useState } from 'react'

export default function RegistrationForm({
  trigger,
  eventTitle,
  speakerDisabled,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState(null)
  const [filiation, setFiliation] = useState(null)
  const [filiationFile, setFiliationFile] = useState(null)

  const navigator = useNavigator()
  const {
    mutateAsync: submitInscription,
    isPending,
    error: submitError,
  } = useSubmitInscription()

  function cleanForm() {
    setRole(null)
    setFiliation(null)
    setFiliationFile(null)
  }

  async function handleSubmit(onClose) {
    if (!role) {
      alert('Ingresar al menos un rol para continuar')
    } else if ((!filiation && filiationFile) || (filiation && !filiationFile)) {
      alert(
        'Para definir una filiación: configurar el nombre y subir un archivo'
      )
    } else {
      setIsLoading(true)
      const inscriptionData = {
        file: filiationFile,
        roles: role.split(','),
        affiliation: filiation,
      }

      await submitInscription({ inscriptionData })
      await sleep(2000)
      setIsLoading(false)
      cleanForm()

      onClose()
      navigator.to(`/events/${eventId}/view`)
    }
  }

  return (
    <FullModal
      trigger={trigger}
      title={'Inscripción al evento ' + eventTitle}
      onSubmit={handleSubmit}
      isPending={isLoading}
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
