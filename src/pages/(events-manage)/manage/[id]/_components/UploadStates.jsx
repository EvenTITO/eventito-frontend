import ButtonWithLoading from '@/components/ButtonWithLoading'

export default function UploadStates({
  isEditing,
  handleCancel,
  handleSave,
  isPending,
}) {
  if (!isEditing) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end gap-4 z-50">
      <ButtonWithLoading onClick={handleCancel} variant="outline">
        Cancelar
      </ButtonWithLoading>
      <ButtonWithLoading onClick={handleSave} isLoading={isPending}>
        Guardar cambios
      </ButtonWithLoading>
    </div>
  )
}
