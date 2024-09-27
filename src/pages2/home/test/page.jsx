import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";

export default function TestPage() {
  const events = [
    {
      id: 1,
      title: "Community Cleanup",
      description: "Join us for a day of cleaning up our local park.",
      date: "2023-09-15",
      location: "Central Park",
      attendees: 50,
    },
    {
      id: 2,
      title: "Food Drive",
      description: "Help collect food donations for the local food bank.",
      date: "2023-09-22",
      location: "City Hall",
      attendees: 30,
    },
    {
      id: 3,
      title: "Senior Center Visit",
      description: "Spend time with seniors at the local care center.",
      date: "2023-09-29",
      location: "Sunshine Senior Living",
      attendees: 20,
    },
  ];

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#1919ac] to-[#0c0b59]">
                Eventos, charlas y conferencias
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Buscá, elegí y participá de cualquier evento académico!
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#1919ac] to-[#121383] text-white hover:from-[#121383] hover:to-[#0c0b59]">
              Ver todos los eventos
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8 text-center text-[#1919ac]">
            Próximos eventos
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg focus-within:shadow-lg bg-white border-[#1919ac] border-opacity-20">
                  <CardHeader>
                    <CardTitle className="text-[#1919ac]">
                      {event.title}
                    </CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <CalendarDays className="h-4 w-4 text-[#121383]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 text-[#121383]" />
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-[#1919ac] transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                      Ver sitio del evento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
