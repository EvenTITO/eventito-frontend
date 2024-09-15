import React from "react";
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
import { useNavigator } from "@/lib/navigation";
import TrackSelector from "./_components/TrackSelector";

export default function Page({ tracks, selectedTrack, assignments }) {
  const navigator = useNavigator();

  const handleRowClick = (assignment) => {
    const path = `works/${assignment.id}`;
    navigator.foward(path);
  };

  return (
    <ContainerPage>
      <TitlePage
        title={`Administración de revisiones`}
        rightComponent={
          <TrackSelector tracks={tracks} selectedTrack={selectedTrack} />
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Fecha de envío</TableHead>
            <TableHead>Estado</TableHead>
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
              <TableCell>{assignment.submitter}</TableCell>
              <TableCell>{assignment.authorCount}</TableCell>
              <TableCell>{format(assignment.submissionDate, "long")}</TableCell>
              <TableCell>{assignment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContainerPage>
  );
}
