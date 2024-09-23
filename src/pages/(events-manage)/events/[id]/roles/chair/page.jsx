import React from "react";
import { useNavigator } from "@/lib/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart } from "lucide-react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import TrackSelector from "./_components/TrackSelector";
import ChairTable from "./_components/ChairTable";
import TableContent from "@/components/TableContent";
import StatCard from "./_components/StatCard";
import WorkStatusChart from "./_components/WorkStatusChart";
import ReviewProgressChart from "./_components/ReviewProgressChart";

export default function Component({
  tracks,
  selectedTrack,
  setSelectedTrack,
  works,
}) {
  const navigator = useNavigator();

  const handleRowClick = (work) => {
    const path = `works/${work.id}`;
    navigator.foward(path);
  };

  const totalWorks = works.length;
  const publishedWorks = works.filter((work) => work.published).length;
  const acceptedWorks = works.filter(
    (work) => work.status === "Aceptado",
  ).length;

  return (
    <ContainerPage>
      <TitlePage
        title={"Administración y envío de revisiones"}
        rightComponent={
          <TrackSelector
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        }
      />
      <div className="space-y-6 pt-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Trabajos presentados"
            value={totalWorks}
            icon="FileText"
          />
          <StatCard
            title="Revisiones publicadas"
            value={publishedWorks}
            icon="ListTodo"
          />
          <StatCard
            title="Trabajos aceptados"
            value={acceptedWorks}
            icon="CheckCircle"
          />
        </div>

        <TableContent title={`Trabajos pendientes a revisar en track: ${selectedTrack}`}>
          <ChairTable works={works} handleRowClick={handleRowClick} />
        </TableContent>

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="status">
              <TabsList>
                <TabsTrigger value="status">
                  <PieChart className="h-4 w-4 mr-2" />
                  Estados de entregas
                </TabsTrigger>
                <TabsTrigger value="progress">
                  <BarChart className="h-4 w-4 mr-2" />
                  Proceso de revisión
                </TabsTrigger>
              </TabsList>
              <TabsContent value="status">
                <WorkStatusChart works={works} />
              </TabsContent>
              <TabsContent value="progress">
                <ReviewProgressChart works={works} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ContainerPage>
  );
}
