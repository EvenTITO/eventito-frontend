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
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { format } from 'date-fns'

export default function AuthorPage() {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      title: "Advancements in Quantum Computing",
      authors: [
        { name: "Dr. Alice Johnson", isPresenting: true },
        { name: "Prof. Bob Smith", isPresenting: false }
      ],
      abstract: "This paper discusses recent breakthroughs in quantum computing...",
      submissionDate: new Date(2023, 5, 15),
      pdfName: "quantum_computing_paper.pdf"
    },
    {
      id: 2,
      title: "AI in Healthcare: A Comprehensive Review",
      authors: [
        { name: "Dr. Emily Brown", isPresenting: true },
        { name: "Dr. David Lee", isPresenting: false },
        { name: "Prof. Sarah Wilson", isPresenting: false }
      ],
      abstract: "Our review examines the current state and future prospects of AI in healthcare...",
      submissionDate: new Date(2023, 5, 20),
      pdfName: "ai_healthcare_review.pdf"
    }
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newSubmission, setNewSubmission] = useState({
    title: '',
    authors: [{ name: '', isPresenting: false }],
    abstract: '',
    pdfName: ''
  })

  const handleAddAuthor = () => {
    setNewSubmission(prev => ({
      ...prev,
      authors: [...prev.authors, { name: '', isPresenting: false }]
    }))
  }

  const handleRemoveAuthor = (index) => {
    setNewSubmission(prev => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index)
    }))
  }

  const handleAuthorChange = (index, field, value) => {
    setNewSubmission(prev => ({
      ...prev,
      authors: prev.authors.map((author, i) => 
        i === index ? { ...author, [field]: value } : author
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newId = submissions.length > 0 ? Math.max(...submissions.map(s => s.id)) + 1 : 1
    setSubmissions([...submissions, {
      ...newSubmission,
      id: newId,
      submissionDate: new Date()
    }])
    setNewSubmission({
      title: '',
      authors: [{ name: '', isPresenting: false }],
      abstract: '',
      pdfName: ''
    })
    setIsOpen(false)
  }

  const handleRowClick = (submission) => {
    alert(`You clicked on: ${submission.title}\nIn the future, this will navigate to a detailed view.`)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Submitted Works</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Submission
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New Submission</SheetTitle>
              <SheetDescription>
                Enter the details for your new submission below.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSubmission.title}
                  onChange={(e) => setNewSubmission({ ...newSubmission, title: e.target.value })}
                  placeholder="Enter submission title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Authors</Label>
                {newSubmission.authors.map((author, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={author.name}
                      onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                      placeholder="Author name"
                      required
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={author.isPresenting}
                        onChange={(e) => handleAuthorChange(index, 'isPresenting', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span>Presenting</span>
                    </label>
                    {index > 0 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveAuthor(index)}>
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddAuthor}>
                  Add Author
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  value={newSubmission.abstract}
                  onChange={(e) => setNewSubmission({ ...newSubmission, abstract: e.target.value })}
                  placeholder="Enter abstract"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdf">PDF Submission</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setNewSubmission({ ...newSubmission, pdfName: e.target.files?.[0]?.name || '' })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Submit Work</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>PDF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow 
              key={submission.id} 
              onClick={() => handleRowClick(submission)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{submission.title}</TableCell>
              <TableCell>{submission.authors.map(a => a.name).join(', ')}</TableCell>
              <TableCell>{format(submission.submissionDate, 'MMM d, yyyy')}</TableCell>
              <TableCell>{submission.pdfName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
