import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
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
import { CalendarDays, MapPin, Search, Users, ArrowRight } from "lucide-react";

export default function MyEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "All" || event.roles.includes(selectedRole)),
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
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="ORGANIZER">Organizer</SelectItem>
              <SelectItem value="CHAIR">Chair</SelectItem>
              <SelectItem value="ASSISTANT">Assistant</SelectItem>
              <SelectItem value="AUTHOR">Author</SelectItem>
              <SelectItem value="REVIEWER">Reviewer</SelectItem>
            </SelectContent>
          </Select>
          <Button>Crear nuevo evento</Button>
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
      <Card className="transition-all duration-300 hover:shadow-lg focus-within:shadow-lg group">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="mr-2">{event.title}</CardTitle>
            <Badge variant="secondary" className="uppercase">
              {event.status}
            </Badge>
          </div>
          <CardDescription>{event.description}</CardDescription>
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

const events = [
  {
    id: "f2c9f5d2-3941-491e-93fc-8de65163c1d2",
    title: "CONGRESO DE QUIMICA",
    description: "Evento en FIUBA",
    event_type: "CONFERENCE",
    location: "FIUBA, Av. Paseo Colon 850",
    dates: [
      {
        date: null,
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        label: "Fecha de Comienzo",
        name: "START_DATE",
        time: null,
      },
      {
        date: null,
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        label: "Fecha de Finalización",
        name: "END_DATE",
        time: null,
      },
      {
        date: null,
        description: "Fecha límite de envío de trabajos.",
        is_mandatory: true,
        label: "Fecha de envío de trabajos",
        name: "SUBMISSION_DEADLINE_DATE",
        time: null,
      },
    ],
    roles: ["ORGANIZER"],
    status: "CREATED",
    tracks: ["track1", "track2", "track3"],
  },
  {
    id: "f2c9f5d2-3941-491e-93fc-8de65163c1d2",
    title: "SIMPOSIO DE INGENIERÍA",
    description: "Evento anual de ingeniería",
    event_type: "SYMPOSIUM",
    location: "FIUBA, Av. Las Heras 2214",
    dates: [
      {
        date: "2023-11-15",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        label: "Fecha de Comienzo",
        name: "START_DATE",
        time: null,
      },
      {
        date: "2023-11-17",
        description: "Fecha de finalización del evento.",
        is_mandatory: true,
        label: "Fecha de Finalización",
        name: "END_DATE",
        time: null,
      },
    ],
    roles: ["CHAIR", "REVIEWER"],
    status: "UPCOMING",
    tracks: ["track1", "track2"],
  },
  {
    id: "f2c9f5d2-3941-491e-93fc-8de65163c1d2",
    title: "WORKSHOP DE PROGRAMACIÓN",
    description: "Taller práctico de programación avanzada",
    event_type: "WORKSHOP",
    location: "Online",
    dates: [
      {
        date: "2023-12-01",
        description: "Fecha del workshop.",
        is_mandatory: true,
        label: "Fecha del Workshop",
        name: "EVENT_DATE",
        time: null,
      },
    ],
    roles: ["ASSISTANT", "AUTHOR"],
    status: "REGISTRATION_OPEN",
    tracks: ["track1"],
  },
];
