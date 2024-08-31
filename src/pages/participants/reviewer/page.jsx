import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns'

export default function ReviewerPage() {
  const [assignments, setAssignments] = React.useState([
    {
      id: 1,
      title: "Machine Learning in Healthcare",
      authorCount: 3,
      submitter: "Dr. Jane Smith",
      maxReviewDate: new Date(2023, 6, 15),
      track: "AI in Medicine"
    },
    {
      id: 2,
      title: "Quantum Computing: A New Era",
      authorCount: 2,
      submitter: "Prof. John Doe",
      maxReviewDate: new Date(2023, 6, 20),
      track: "Quantum Technologies"
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions",
      authorCount: 4,
      submitter: "Dr. Emily Brown",
      maxReviewDate: new Date(2023, 6, 18),
      track: "Green Technologies"
    },
    {
      id: 4,
      title: "Cybersecurity in IoT Devices",
      authorCount: 2,
      submitter: "Alex Johnson",
      maxReviewDate: new Date(2023, 6, 25),
      track: "Internet of Things"
    },
    {
      id: 5,
      title: "Advancements in CRISPR Technology",
      authorCount: 5,
      submitter: "Dr. Michael Lee",
      maxReviewDate: new Date(2023, 6, 22),
      track: "Biotechnology"
    }
  ])

  const handleRowClick = (assignment) => {
    alert(`You clicked on: ${assignment.title}\nIn the future, this will navigate to a detailed view.`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Reviewer Assignments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Submitter</TableHead>
            <TableHead>Max Review Date</TableHead>
            <TableHead>Track</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow 
              key={assignment.id} 
              onClick={() => handleRowClick(assignment)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{assignment.title}</TableCell>
              <TableCell>{assignment.authorCount}</TableCell>
              <TableCell>{assignment.submitter}</TableCell>
              <TableCell>{format(assignment.maxReviewDate, 'MMM d, yyyy')}</TableCell>
              <TableCell>{assignment.track}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
