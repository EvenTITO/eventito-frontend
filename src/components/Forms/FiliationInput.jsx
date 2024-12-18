import FilePicker from '../Modal/FilePickerModal'
import NameInput from './NameInput'

export default function FiliationInput({
  label,
  filiation,
  setFiliation,
  filiationFile,
  setFiliationFile,
}) {
  function handleFileChange(file) {
    setFiliationFile(file)
  }

  return (
    <div className="space-y-4">
      {label}
      <p>
        La filiación podrá ser modificada una vez finalizada la inscripción.
      </p>
      <NameInput
        label="Nombre de su filiación"
        value={filiation}
        setValue={setFiliation}
      />
      <FilePicker
        title="Cargar un archivo de filiación"
        modalTitle="Cargar un archivo de filiación"
        allowedTypes={['.pdf']}
        onSave={handleFileChange}
        logo="File"
      />
    </div>
  )
}
