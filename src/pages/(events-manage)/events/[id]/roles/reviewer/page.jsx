import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Assigment from "./assigment";
import { format } from "@formkit/tempo";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";

export default function Page({ assignments }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleRowClick = (assignment) => {
    console.log(assignment);
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
    <ContainerPage>
      <TitlePage title={"Asignaciones de revisión"} />
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
              <TableCell>{format(assignment.maxReviewDate, "long")}</TableCell>
              <TableCell>{assignment.track}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContainerPage>
  );
}
