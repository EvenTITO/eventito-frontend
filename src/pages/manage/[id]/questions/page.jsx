import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon, Trash2Icon } from 'lucide-react'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([
    { id: 1, text: "How would you rate the overall quality of this submission?", type: "Calification", isMandatory: true },
    { id: 2, text: "What are the main strengths of this submission?", type: "Question", isMandatory: true },
    { id: 3, text: "Is this submission suitable for presentation?", type: "MultipleChoice", options: ["Yes", "No", "Maybe"], isMandatory: true },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'Question',
    options: [],
    isMandatory: false
  })

  const handleAddOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }))
  }

  const handleRemoveOption = (index) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }))
  }

  const handleOptionChange = (index, value) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.map((option, i) => i === index ? value : option)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
    setQuestions([...questions, { ...newQuestion, id: newId }])
    setNewQuestion({
      text: '',
      type: 'Question',
      options: [],
      isMandatory: false
    })
    setIsOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Review Questions</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Question
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Review Question</SheetTitle>
              <SheetDescription>
                Enter the details for the new review question below.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text</Label>
                <Input
                  id="questionText"
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  placeholder="Enter question text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Question Type</Label>
                <RadioGroup
                  value={newQuestion.type}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Calification" id="calification" />
                    <Label htmlFor="calification">Calification</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Question" id="question" />
                    <Label htmlFor="question">Question</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MultipleChoice" id="multipleChoice" />
                    <Label htmlFor="multipleChoice">Multiple Choice</Label>
                  </div>
                </RadioGroup>
              </div>
              {newQuestion.type === 'MultipleChoice' && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  {newQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        required
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveOption(index)}>
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={handleAddOption}>
                    Add Option
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mandatory"
                  checked={newQuestion.isMandatory}
                  onCheckedChange={(checked) => setNewQuestion({ ...newQuestion, isMandatory})}
                />
                <Label htmlFor="mandatory">Mandatory</Label>
              </div>
              <Button type="submit" className="w-full">Add Question</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Options</TableHead>
            <TableHead>Mandatory</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">{question.text}</TableCell>
              <TableCell>{question.type}</TableCell>
              <TableCell>{question.options?.join(', ') || '-'}</TableCell>
              <TableCell>{question.isMandatory ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
