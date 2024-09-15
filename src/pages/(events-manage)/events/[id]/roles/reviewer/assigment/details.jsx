import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDown, Calendar, Users, User, BookOpen } from "lucide-react";
import { format } from "date-fns";

export function DetailsTab({ selectedAssignment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la entrega</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Autores:</span>{" "}
          {selectedAssignment.authors.join(", ")}
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Orador:</span>{" "}
          {selectedAssignment.orator}
        </div>
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Track:</span>{" "}
          {selectedAssignment.track}
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold">Fecha límite de revisión:</span>{" "}
          {format(selectedAssignment.maxReviewDate, "MMMM d, yyyy")}
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Abstract</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <p>{selectedAssignment.abstract}</p>
          </ScrollArea>
        </div>
        <Button
          className="w-full"
          onClick={() => window.open(selectedAssignment.pdfLink, "_blank")}
        >
          <FileDown className="mr-2 h-4 w-4" /> Descargar entrega (PDF)
        </Button>
      </CardContent>
    </Card>
  );
}
