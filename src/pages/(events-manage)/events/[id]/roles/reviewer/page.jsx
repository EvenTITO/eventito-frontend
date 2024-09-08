import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Assigment from "./assigment";

export default function Page({ assignments }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleRowClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  if (selectedAssignment) {
    return (
      <Assigment
        selectedAssignment={selectedAssignment}
        setSelectedAssignment={setSelectedAssignment}
      />
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Asignaciones de revisión</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha límite de revisión</TableHead>
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
              <TableCell>
                {format(assignment.maxReviewDate, "MMM d, yyyy")}
              </TableCell>
              <TableCell>{assignment.track}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
