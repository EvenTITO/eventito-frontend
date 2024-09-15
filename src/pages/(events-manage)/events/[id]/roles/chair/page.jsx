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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TrackSelector({ tracks, selectedTrack }) {
  return (
    <div className="flex gap-2 items-center">
      <span>Track actual: </span>
      <Select value={selectedTrack} onValueChange={(track) => alert(track)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedTrack} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Elección de track</SelectLabel>
            {tracks.map((track) => (
              <SelectItem value={track}>{track}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
