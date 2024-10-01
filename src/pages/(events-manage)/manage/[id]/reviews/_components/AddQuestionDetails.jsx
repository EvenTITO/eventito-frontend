import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
