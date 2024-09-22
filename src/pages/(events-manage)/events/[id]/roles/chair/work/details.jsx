import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDown, Calendar, Users, User, BookOpen } from "lucide-react";
import { format } from "date-fns";
import ButtonWithLoading from "@/components/ButtonWithLoading";

export function DetailsTab({ selectedWork: work, getFileData, isPending }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la entrega</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Responsable:&nbsp;</span>
          {work.submitter}
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Autores:&nbsp;</span>
          {work.authors.join(", ")}
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Track:&nbsp;</span>
          {work.track}
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Última actualización:&nbsp;</span>
          {format(work.lastUpdate, "MMMM d, yyyy")}
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Abstract</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <p>{work.abstract}</p>
          </ScrollArea>
        </div>
        <ButtonWithLoading
          onClick={() => getFileData()}
          className="w-full"
          text="Descargar entrega (PDF)"
          isLoading={isPending}
        />
      </CardContent>
    </Card>
  );
}
