import { useState } from 'react'
import { Edit2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEditWork } from '@/hooks/events/authorHooks'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { cn } from '@/lib/utils.js'

export default function EditableWork({ workData }) {
  const [title, setTitle] = useState(workData.title)
  const [keywords, setKeywords] = useState(workData.keywords?.join(','))
  const [abstract, setAbstract] = useState(workData.abstract)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(workData.pdfFileName)
  const [isEditing, setIsEditing] = useState(false)

  const { mutateAsync: editWork, isPending, error } = useEditWork()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await editWork({
      workData: {
        title,
        keywords,
        abstract,
        file,
      },
    })
      .then(() => console.log('Trabajo actualizado'))
      .catch((e) => console.log(e))
    setFile(null)
    setFileName(workData.pdfFileName)
    setIsEditing(false)
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-8">
        <CardHeader>
          <CardTitle>Editar contenido de entrega</CardTitle>
          <CardDescription>
            Modifique los siguientes datos para actualizar la entrega.
          </CardDescription>
        </CardHeader>
        {!isEditing && (
          <div className="grid gap-4 items-center px-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        )}
      </div>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ingresar título del trabajo"
                disabled={!isEditing}
                className={cn(
                  'grid gap-4',
                  !isEditing
                    ? 'cursor-not-allowed opacity-50 hover:border-inherit'
                    : ''
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ingresar keywords (separadas por coma)"
              disabled={!isEditing}
              className={cn(
                'grid gap-4',
                !isEditing
                  ? 'cursor-not-allowed opacity-50 hover:border-inherit'
                  : ''
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Ingresar el abstract del trabajo"
              className="min-h-[100px]"
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className={cn(
                  'hidden',
                  !isEditing
                    ? 'cursor-not-allowed opacity-50 hover:border-inherit'
                    : ''
                )}
                disabled={!isEditing}
              />
              <Button
                type="button"
                onClick={() => document.getElementById('pdf')?.click()}
                variant="outline"
                className={cn(
                  'w-full',
                  !isEditing
                    ? 'cursor-not-allowed opacity-50 hover:border-inherit'
                    : ''
                )}
                disabled={!isEditing}
              >
                <Upload className="mr-2 h-4 w-4" />
                {fileName || 'Elegir archivo PDF'}
              </Button>
            </div>
          </div>
          {isEditing && (
            <div className="bg-background border-t p-4 flex justify-end gap-4 z-50">
              <ButtonWithLoading
                onClick={() => {
                  setFile(null)
                  setFileName(workData.pdfFileName)
                  setIsEditing(false)
                }}
                variant="outline"
              >
                Cancelar
              </ButtonWithLoading>
              <ButtonWithLoading type="submit" isLoading={isPending}>
                Guardar cambios
              </ButtonWithLoading>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
