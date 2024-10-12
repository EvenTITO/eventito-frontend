import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ButtonWithLoading from '@/components/ButtonWithLoading'

export default function AddQuestionDetails({
  isDetailsDialogOpen,
  setIsDetailsDialogOpen,
  newQuestion,
  setNewQuestion,
  newQuestionType,
  handleSaveNewQuestion,
  isPending,
}) {
  return (
    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configuración de pregunta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-title">Título</Label>
            <Input
              id="new-title"
              value={newQuestion?.question || ''}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
            />
          </div>
          {newQuestionType === 'rating' && (
            <div>
              <Label htmlFor="new-max-value">Máximo valor</Label>
              <Input
                id="new-max-value"
                type="number"
                value={newQuestion?.max_value || 5}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    max_value: parseInt(e.target.value),
                  })
                }
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Switch
              id="mandatory"
              checked={newQuestion?.is_mandatory || false}
              onCheckedChange={(checked) =>
                setNewQuestion({ ...newQuestion, is_mandatory: checked })
              }
            />
            <Label htmlFor="mandatory">Obligatoria</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={newQuestion?.is_public || false}
              onCheckedChange={(checked) =>
                setNewQuestion({ ...newQuestion, is_public: checked })
              }
            />
            <Label htmlFor="public">Pública para autores</Label>
          </div>
        </div>
        <ButtonWithLoading
          onClick={handleSaveNewQuestion}
          isLoading={isPending}
        >
          Guardar
        </ButtonWithLoading>
      </DialogContent>
    </Dialog>
  )
}
