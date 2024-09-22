import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarDays, MapPin, Tag, Users, Clock, Mail } from "lucide-react";
import { RegistrationTab } from "./prices";

export default function Page({ eventInfo }) {
  const [activeTab, setActiveTab] = useState("overview");
  console.log(eventInfo);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle className="text-3xl font-bold mr-2">
                    {eventInfo.title}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Organizado por: {eventInfo.organized_by}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {eventInfo.media.find((item) => item.name === "banner_image") && (
                <img
                  src={
                    eventInfo.media.find((item) => item.name === "banner_image")
                      .url
                  }
                  alt="Event Banner"
                  width={1200}
                  height={400}
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-lg mb-6"
                />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Informacion general</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{eventInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Organizado por: {eventInfo.organized_by}</span>
                </div>
                {eventInfo.dates.map((date, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5" />
                    <span>
                      {date.label}: {date.date || "A definir"} {date.time || ""}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">General</TabsTrigger>
            <TabsTrigger value="presentations">Presentaciones</TabsTrigger>
            <TabsTrigger value="schedule">Calendario</TabsTrigger>
            <TabsTrigger value="registration">Registro</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acerca del evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{eventInfo.description}</p>
                {eventInfo.media.find((item) => item.name === "main_image") && (
                  <img
                    src={
                      eventInfo.media.find((item) => item.name === "main_image")
                        .url
                    }
                    alt="Event Main Image"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover rounded-lg mt-4"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="presentations">
            <Card>
              <CardHeader>
                <CardTitle>Tracks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {eventInfo.tracks.map((track, index) => (
                    <div
                      key={index}
                      className="bg-secondary text-secondary-foreground rounded-lg p-4 flex items-center justify-center"
                    >
                      <Tag className="h-5 w-5 mr-2" />
                      <span className="font-medium">{track}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Planificacion del evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Detalles de la planificacion van a estar disponibles pronto.
                </p>
                <div className="mt-4 space-y-2">
                  {eventInfo.dates.map((date, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>
                        {date.label}: {date.date || "A definir"}{" "}
                        {date.time || ""}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="registration">
            <RegistrationTab event={eventInfo} />
          </TabsContent>
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informacion de contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Organizador por: {eventInfo.organized_by}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Contacto: {eventInfo.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{eventInfo.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
