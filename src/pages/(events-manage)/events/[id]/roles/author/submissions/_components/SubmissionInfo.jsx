import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FileTextIcon } from "lucide-react";
import StatCard from "./StatCard";

export default function SubmissionInfo({ submissionData }) {
  const canModify = new Date(submissionData.deadline_date) > new Date();

  return (
    <div className="space-y-8">
      <div className="flex space-x-8">
        <div className="flex-grow space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {submissionData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <Badge variant="outline">{submissionData.track}</Badge>
                <Badge variant="outline">{submissionData.state}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {submissionData.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {submissionData.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Estado"
              value={submissionData.state}
              icon="CheckCircle"
            />
            <StatCard
              title="Modificable"
              value={canModify ? "Sí" : "No"}
              icon="FileText"
            />
            <StatCard
              title="Última actualización"
              value={new Date(submissionData.last_update).toLocaleDateString()}
              icon="ClockIcon"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Detalles de la presentación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Fecha:</strong>{" "}
                  {new Date(submissionData.talk?.date).toLocaleString()}
                </p>
                <p className="text-sm">
                  <strong>Ubicación:</strong> {submissionData.talk?.location}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileTextIcon className="mr-2 h-5 w-5" />
                Autores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submissionData.authors.map((author, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-accent"
                  >
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${author.full_name}`}
                      />
                      <AvatarFallback>
                        {author.full_name?.charAt(0) || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{author.full_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {author.mail}
                      </p>
                      <div className="flex gap-2 mt-1">
                        {author.is_main && (
                          <Badge variant="secondary">Principal</Badge>
                        )}
                        {author.is_speaker && (
                          <Badge variant="secondary">Orador</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Revisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No hay revisiones disponibles en este momento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
