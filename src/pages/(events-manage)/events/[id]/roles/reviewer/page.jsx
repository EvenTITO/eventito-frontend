import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "@formkit/tempo";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page({ assignments }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRowClick = (assignment) => {
    navigate(`${location.pathname}/assignments/${assignment.id}`);
  };

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
