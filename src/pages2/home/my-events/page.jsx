import FetchStatus from "@/components/FetchStatus";
import { getMyEvents } from "@/services/api/events/general/hooks";

export default function MyEventsPage() {
  const { isPending, error, data: events } = getMyEvents();

  const component = <MyEvents events={events} />;
  if (events) {
    console.log(events);
  }
  return (
    <FetchStatus isPending={isPending} error={error} component={component} />
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, MapPin, Search, ArrowRight } from "lucide-react";
import {
  ATTENDEE_ROLE,
  CHAIR_ROLE,
  EVENT_ROLES_LABELS,
  ORGANIZER_ROLE,
  REVIEWER_ROLE,
  SPEAKER_ROLE
} from "@/lib/Constants.js";

function MyEvents({ events }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL_ROLES");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "ALL_ROLES" || event.roles.includes(selectedRole)),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis eventos</h1>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
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
        <div className="flex items-center space-x-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL_ROLES">Todos los roles</SelectItem>
              <SelectItem value={ORGANIZER_ROLE}>{EVENT_ROLES_LABELS[ORGANIZER_ROLE]}</SelectItem>
              <SelectItem value={CHAIR_ROLE}>{EVENT_ROLES_LABELS[CHAIR_ROLE]}</SelectItem>
              <SelectItem value={ATTENDEE_ROLE}>{EVENT_ROLES_LABELS[ATTENDEE_ROLE]}</SelectItem>
              <SelectItem value={SPEAKER_ROLE}>{EVENT_ROLES_LABELS[SPEAKER_ROLE]}</SelectItem>
              <SelectItem value={REVIEWER_ROLE}>{EVENT_ROLES_LABELS[REVIEWER_ROLE]}</SelectItem>
            </SelectContent>
          </Select>
          <Link to={"/home/create-event"}>
            <Button>
              Crear nuevo evento
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No events found matching your search and role filter.
        </p>
      )}
    </div>
  );
}

function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}/view`} className="block">
      <Card className="transition-all duration-300 hover:shadow-lg focus-within:shadow-lg group min-h-[250px]">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="mr-2">{event.title}</CardTitle>
            <Badge variant="secondary" className="uppercase">
              {event.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {event.roles.map((role, index) => (
              <Badge key={index} variant="outline" className="uppercase">
                {role}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <CalendarDays className="h-4 w-4" />
            <span>
              {event.startDate} - {event.endDate}
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

