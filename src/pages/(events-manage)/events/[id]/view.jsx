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

export default function EventViewPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle className="text-3xl font-bold mr-2">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Organizado por: {event.organized_by}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {event.media.find((item) => item.name === "banner_image") && (
                <img
                  src={
                    event.media.find((item) => item.name === "banner_image").url
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
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Organizado por: {event.organized_by}</span>
                </div>
                {event.dates.map((date, index) => (
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
                <p className="text-muted-foreground">{event.description}</p>
                {event.media.find((item) => item.name === "main_image") && (
                  <img
                    src={
                      event.media.find((item) => item.name === "main_image").url
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
                  {event.tracks.map((track, index) => (
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
                  {event.dates.map((date, index) => (
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
            <RegistrationTab event={event} />
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
                    <span>Organizador por: {event.organized_by}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Contacto: {event.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
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

const event = {
  id: "5e7c9063-df75-49ee-8e6c-cd86cc532fce",
  title: "Pycon 2024",
  description: `PyCon 2024 Argentina es la conferencia más esperada para la comunidad de Python en América Latina. Este evento reúne a desarrolladores, profesionales de tecnología, investigadores, estudiantes y entusiastas del software libre para compartir conocimientos, aprender nuevas tecnologías y conectarse con personas apasionadas por Python y su ecosistema.


Durante PyCon 2024, los asistentes podrán disfrutar de una amplia variedad de charlas, talleres, paneles y actividades centradas en el lenguaje de programación Python. Desde temas de ciencia de datos, machine learning, desarrollo web, hasta la automatización y las mejores prácticas de software, PyCon Argentina se destaca por su diversidad de contenidos y la calidad de sus ponentes, tanto locales como internacionales.
Además de las sesiones técnicas, el evento fomentará el networking con espacios dedicados a la colaboración, sesiones de preguntas y respuestas, y momentos para compartir ideas innovadoras. También se realizarán actividades sociales para crear conexiones más allá de la tecnología, brindando a los participantes la oportunidad de integrarse en la comunidad Python.


Este año, PyCon 2024 Argentina se llevará a cabo en la vibrante ciudad de Buenos Aires, conocida por su rica cultura, gastronomía y hospitalidad. Si eres un desarrollador experimentado o alguien que recién está comenzando en el mundo de la programación, PyCon 2024 es el lugar ideal para expandir tus horizontes, aprender nuevas habilidades y ser parte de una comunidad global de apasionados por Python. ¡No te pierdas esta oportunidad única de sumergirte en el mundo Python en Argentina!"`,
  event_type: "CONFERENCE",
  location: "FIUBA, Av. Paseo Colon 850",
  contact: "informatica@fi.uba.ar",
  organized_by: "Depto. de Informática @FIUBA",
  dates: [
    {
      name: "START_DATE",
      label: "Fecha de Comienzo",
      description: "Fecha de comienzo del evento.",
      is_mandatory: true,
      date: "09/10/2024",
      time: "10:00 hs",
    },
    {
      name: "END_DATE",
      label: "Fecha de Finalización",
      description: "Fecha de comienzo del evento.",
      is_mandatory: true,
      date: "12/10/2024",
      time: "12:00 hs",
    },
    {
      name: "SUBMISSION_DEADLINE_DATE",
      label: "Fecha de envío de trabajos",
      description: "Fecha límite de envío de trabajos.",
      is_mandatory: true,
      date: "10/09/2024",
      time: null,
    },
  ],
  roles: ["ORGANIZER"],
  status: "CREATED",
  tracks: ["track1", "track2", "track3", "track4", "track5", "track6"],
  pricing: [
    {
      name: "Asistentes. 50% descuento",
      description: "Tarifa con descuento hasta el 12/09",
      value: 3000,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Asistentes",
      description: "Tarifa para asistentes a partir del 12/09",
      value: 6000,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Alumnos asistentes",
      description: "Tarifa para alumnos de FIUBA",
      value: 2500,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Tarifa para oradores",
      description: "Hasta 5 trabajos con un pago",
      value: 6000,
      currency: "ARS",
      need_verification: true,
    },
  ],
  review_skeleton: { questions: [] },
  media: [
    {
      name: "main_image",
      url: "https://cdn.uniacco.com/blog/wp-content/uploads/2021/06/02122118/samuel-pereira-uf2nnANWa8Q-unsplash-min-scaled.jpg",
    },
    {
      name: "brochure",
      url: "https://storage.googleapis.com/eventito-static_event_content/5e7c9063-df75-49ee-8e6c-cd86cc532fce/brochure",
    },
    {
      name: "banner_image",
      url: "https://2023.pycon.co/static/img/general_resources/logo_main.png",
    },
  ],
};
