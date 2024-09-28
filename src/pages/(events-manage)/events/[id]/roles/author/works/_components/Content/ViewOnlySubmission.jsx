import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ViewOnlySubmission({ submissionData }) {
  const { title, track, keywords, abstract, pdfFileName } = submissionData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles de la entrega</CardTitle>
        <CardDescription>
          Visualización de los detalles de la entrega.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <div className="p-2 border rounded-md">{title}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="track">Track</Label>
              <div className="p-2 border rounded-md">{track}</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <div className="p-2 border rounded-md">{keywords}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <div className="p-2 border rounded-md min-h-[100px]">
              {abstract}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdf">PDF</Label>
            <div className="p-2 border rounded-md">
              {pdfFileName || "No se ha cargado ningún archivo"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
