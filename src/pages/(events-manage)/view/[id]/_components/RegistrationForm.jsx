import FiliationInput from '@/components/Forms/FiliationInput'
import InscriptionRoleSelector from '@/components/Forms/InscriptionRoleSelector'
import LabelForm from '@/components/Forms/LabelForm'
import FullModal from '@/components/Modal/FullModal'
import { Switch } from '@/components/ui/switch'
import { useSubmitInscription } from '@/hooks/events/attendeeHooks'
import { sleep } from '@/lib/utils'
import { useState } from 'react'

export default function RegistrationForm({
  trigger,
  eventTitle,
  speakerDisabled,
  setInscriptionSuccess,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState(null)
  const [filiation, setFiliation] = useState(null)
  const [filiationFile, setFiliationFile] = useState(null)

  const [showFiliation, setShowFiliation] = useState(false)

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
      setInscriptionSuccess(true)
      cleanForm()

      onClose()
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
      {showFiliation ? (
        <FiliationInput
          label={
            <LabelFileInput
              showFiliation={showFiliation}
              setShowFiliation={setShowFiliation}
            />
          }
          filiation={filiation}
          setFiliation={setFiliation}
          filiationFile={filiationFile}
          setFiliationFile={setFiliationFile}
        />
      ) : (
        <LabelFileInput
          showFiliation={showFiliation}
          setShowFiliation={setShowFiliation}
        />
      )}
    </FullModal>
  )
}

function LabelFileInput({ showFiliation, setShowFiliation }) {
  return (
    <div className="flex justify-between">
      <LabelForm label="En caso de tener, ingresar una filiación" />
      <Switch
        checked={showFiliation}
        onCheckedChange={() => setShowFiliation(!showFiliation)}
      />
    </div>
  )
}
