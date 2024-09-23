import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart } from "lucide-react";
import WorkStatusChart from "./WorkStatusChart";
import ReviewProgressChart from "./ReviewProgressChart";

export default function Insights({ works }) {
  return (
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
  );
}
