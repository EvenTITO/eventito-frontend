import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'


const tracks = [
  "All Tracks",
  "AI in Medicine",
  "Quantum Technologies",
  "Green Technologies",
  "Internet of Things",
  "Biotechnology"
]

export default function ChairPage() {
  const [currentTrack, setCurrentTrack] = useState("All Tracks")
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Machine Learning in Healthcare",
      authorCount: 3,
      submitter: "Dr. Jane Smith",
      maxReviewDate: new Date(2023, 6, 15),
      track: "AI in Medicine",
      reviewers: ["Dr. Alan Turing", "Dr. Grace Hopper", "Dr. John von Neumann"]
    },
    {
      id: 2,
      title: "Quantum Computing: A New Era",
      authorCount: 2,
      submitter: "Prof. John Doe",
      maxReviewDate: new Date(2023, 6, 20),
      track: "Quantum Technologies",
      reviewers: ["Dr. Richard Feynman", "Dr. Marie Curie"]
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions",
      authorCount: 4,
      submitter: "Dr. Emily Brown",
      maxReviewDate: new Date(2023, 6, 18),
      track: "Green Technologies",
      reviewers: ["Dr. Nikola Tesla", "Dr. Thomas Edison", "Dr. Albert Einstein", "Dr. Michael Faraday"]
    },
    {
      id: 4,
      title: "Cybersecurity in IoT Devices",
      authorCount: 2,
      submitter: "Alex Johnson",
      maxReviewDate: new Date(2023, 6, 25),
      track: "Internet of Things",
      reviewers: ["Dr. Ada Lovelace", "Dr. Claude Shannon"]
    },
    {
      id: 5,
      title: "Advancements in CRISPR Technology",
      authorCount: 5,
      submitter: "Dr. Michael Lee",
      maxReviewDate: new Date(2023, 6, 22),
      track: "Biotechnology",
      reviewers: ["Dr. Jennifer Doudna", "Dr. Emmanuelle Charpentier", "Dr. George Church"]
    }
  ])

  const filteredAssignments = currentTrack === "All Tracks" 
    ? assignments 
    : assignments.filter(assignment => assignment.track === currentTrack)

  const handleRowClick = (assignment) => {
    alert(`You clicked on: ${assignment.title}\nIn the future, this will navigate to a detailed view.`)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chair Dashboard</h1>
        <Select value={currentTrack} onValueChange={setCurrentTrack}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select track" />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track} value={track}>
                {track}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Submitter</TableHead>
            <TableHead>Max Review Date</TableHead>
            <TableHead>Track</TableHead>
            <TableHead>Reviewers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssignments.map((assignment) => (
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
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 px-2 lg:px-3">
                      {assignment.reviewers.length} Reviewers
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <ul className="list-none p-2">
                      {assignment.reviewers.map((reviewer, index) => (
                        <li key={index} className="py-1">{reviewer}</li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
