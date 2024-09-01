import FetchStatus from "@/components/FetchStatus";
import { getPublicEvents } from "@/services/api/events/general/hooks";

export default function HomePage() {
  const { isPending, error, data: events } = getPublicEvents();

  const component = <HomeMain events={events} />;
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, MapPin, Search, ArrowRight } from "lucide-react";

function HomeMain({events}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden bg-gray-50">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-black">
                Eventos, charlas y conferencias
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl relative">
                Buscá, elegí y particiá de cualquier evento académico!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 md:mb-0">
              Próximos eventos
            </h2>
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar eventos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard event={event} />
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No hay eventos.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function EventCard({ event }) {
  return (
    <Link href={`/events/${event.id}`} className="block">
      <Card className="transition-all duration-300 hover:shadow-lg focus-within:shadow-lg group">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDays className="h-4 w-4" />
            <span>
              Inicio: {event.startDate ? event.startDate : "A definir"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <CalendarDays className="h-4 w-4" />
            <span>
              Ultimo dia: {event.endData ? event.endData : "A definir"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
            Ver sitio del evento
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
