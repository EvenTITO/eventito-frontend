import { HTTPClient } from "@/services/api/HTTPClient";
import { apiGetMyEvents } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";
import { EVENTS_URL } from "@/lib/Constants";
import { useDispatch } from "react-redux";
import FetchStatus from "@/components/FetchStatus";

export default function HomePage() {
  const dispatch = useDispatch();
  const httpClient = new HTTPClient(EVENTS_URL, dispatch);

  const { isPending, error, data } = useQuery({
    queryKey: ["getMyEvents"],
    queryFn: () => apiGetMyEvents(httpClient),
  });

  const component = <HomeMain />;
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, MapPin, Users, Search, ArrowRight } from "lucide-react";

function HomeMain() {
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
              {event.startDate} - {event.endDate}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <Users className="h-4 w-4" />
            <span>{event.attendees} attendees</span>
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

const events = [
  {
    id: 1,
    title: "Community Cleanup",
    description: "Join us for a day of cleaning up our local park.",
    startDate: "2023-09-15",
    endDate: "2023-09-16",
    location: "Central Park",
    attendees: 50,
  },
  {
    id: 2,
    title: "Food Drive",
    description: "Help collect food donations for the local food bank.",
    startDate: "2023-09-15",
    endDate: "2023-09-16",
    location: "City Hall",
    attendees: 30,
  },
  {
    id: 3,
    title: "Senior Center Visit",
    description: "Spend time with seniors at the local care center.",
    startDate: "2023-09-15",
    endDate: "2023-09-16",
    location: "Sunshine Senior Living",
    attendees: 20,
  },
  {
    id: 4,
    title: "Beach Cleanup",
    description: "Help clean up our local beach and protect marine life.",
    startDate: "2023-09-15",
    endDate: "2023-09-16",
    location: "Sunny Beach",
    attendees: 40,
  },
];
