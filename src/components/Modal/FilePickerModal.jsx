import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import CardWithFocus from '../Card/CardWithFocus'
import MiniModal from './MiniModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FilePicker({
  title,
  modalTitle,
  imageURL = null,
  logo = 'Image',
  allowedTypes = ['.png', '.jpeg', '.jpg'],
  onSave,
}) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [text, setText] = useState('Haz click para agregar')

  const isFileTypeAllowed = (fileName) => {
    const fileExtension = '.' + fileName.split('.').pop().toLowerCase()
    return allowedTypes.includes(fileExtension)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile && isFileTypeAllowed(selectedFile.name)) {
      setFile(selectedFile)
      setText('Haz click para modificar')
    } else {
      alert('Ingresar un tipo de archivo válido.')
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && isFileTypeAllowed(droppedFile.name)) {
      setFile(droppedFile)
      setText('Haz click para modificar')
    } else {
      alert('Arrastrar un tipo de archivo válido.')
    }
  }

  const openFileDialog = () => {
    fileInputRef.current.click()
  }

  function trigger(onOpen) {
    return (
      <CardWithFocus
        imageIcon={imageURL ? imageURL : null}
        nameIcon={imageURL ? null : logo}
        onClick={onOpen}
      >
        <div className="flex-grow">
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground italic">
            {imageURL ? (
              <span>Haz click para editar</span>
            ) : (
              <span>{text}</span>
            )}
          </p>
        </div>
      </CardWithFocus>
    )
  }

  async function handleSubmit(onClose) {
    setIsLoading(true)
    await onSave(file)
    setIsLoading(false)
    onClose()
  }

  return (
    <MiniModal
      trigger={trigger}
      title={modalTitle}
      onSubmit={handleSubmit}
      isPending={isLoading}
      size="2xl"
      validated={file}
    >
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? 'border-primary' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <p className="mt-2 text-sm font-semibold text-gray-900">
              {file.name}
            </p>
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-4 max-h-40 rounded"
              />
            )}
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <Label
              htmlFor="file-upload"
              className="mt-2 block text-sm font-semibold text-gray-900"
            >
              Arrastrar un archivo hacia este recuadro, o seleccionar uno de tu
              computadora.
            </Label>
          </>
        )}
        <Input
          id="file-upload"
          name="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept={allowedTypes.join(',')}
        />
        {!file && (
          <Button
            type="button"
            onClick={openFileDialog}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Seleccionar archivo
          </Button>
        )}
      </div>
    </MiniModal>
  )
}
