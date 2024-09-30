import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, ChevronRight, Bell, User } from "lucide-react";
import { useGetEventsWaitingApproval, useUpdateEventStatus } from "@/hooks/admin/adminEventsHooks"
import { useAdminGetUsers, useAdminUpdateUserRole } from "@/hooks/admin/adminUsersHooks"

export default function AdminPanel() {
  const { isPending: eventsPending, error: eventsError, data: eventsWaitingApproval } = useGetEventsWaitingApproval();
  const { mutate: updateEventStatus} = useUpdateEventStatus();
  const { isPending: usersPending, error: usersError, data: users } = useAdminGetUsers();
  const { mutate: updateUserRole} = useAdminUpdateUserRole();
  

  if (!eventsPending) {
    console.log(`events waiting approval: ${JSON.stringify(eventsWaitingApproval)}`)
  }

  if (!usersPending) {
    console.log(`users: ${JSON.stringify(users)}`);
  }
  const [activeTab, setActiveTab] = useState("events");

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "CONGRESO DE QUIMICA",
      organizer: "Pepe Argento",
      location: "FIUBA, Av. Paseo Colon 850",
      contact: "Pepe",
      organized_by: "Pepe Argento",
      description: "Evento en FIUBA",
      event_type: "CONFERENCE",
      start_date: "2024-10-10",
      end_date: "2024-11-10",
      status: "pending",
    },
  ]);

  const [members, setMembers] = useState([
    {
      id: "1",
      name: "Alice Cooper",
      email: "alice@example.com",
      role: "Administrator",
    },
    {
      id: "2",
      name: "Bob Dylan",
      email: "bob@example.com",
      role: "Event Creator",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "No Role",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = (id, newStatus) => {
    updateEventStatus({eventId:"a8f618c7-717d-45a8-92f6-eb74736946bb", newStatus: "CREATED"})

    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: newStatus } : event,
      ),
    );
    setSelectedEvent(null);
    setNewStatus("");
  };

  const handleRoleChange = (id, newRole) => {
    console.log('cambio', id, newRole);
    updateUserRole({userId:'iuaealdasldanfas982983297234', newRole: 'EVENT_CREATOR'});
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, role: newRole } : member,
      ),
    );
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredMembers = members.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "All" || member.role === roleFilter),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Panel de administrador</h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveTab("events")}
                className={`text-base ${activeTab === "events" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
              >
                Eventos
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`text-base ${activeTab === "members" ? "text-black" : "text-gray-400 hover:text-gray-600"}`}
              >
                Miembros
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="table" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {activeTab === "events"
                ? "Solicitudes de eventos"
                : "Miembros y roles"}
            </h2>
            <div className="flex items-center space-x-2 w-64">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
          </div>

          {activeTab === "events" && (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.organizer}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {activeTab === "members" && (
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <Select
                    value={member.role}
                    onValueChange={(value) =>
                      handleRoleChange(member.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">
                        Administrador
                      </SelectItem>
                      <SelectItem value="Event Creator">
                        Event Creator
                      </SelectItem>
                      <SelectItem value="No Role">No Role</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Usuario</Label>
              <div className="col-span-3">{selectedEvent?.organizer}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Ubicacion</Label>
              <div className="col-span-3">{selectedEvent?.location}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Contacto</Label>
              <div className="col-span-3">{selectedEvent?.contact}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Organizado por</Label>
              <div className="col-span-3">{selectedEvent?.organized_by}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Descripcion</Label>
              <div className="col-span-3">{selectedEvent?.description}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tipo de evento</Label>
              <div className="col-span-3">{selectedEvent?.event_type}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Fecha de inicio</Label>
              <div className="col-span-3">{selectedEvent?.start_date}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Fecha de fin</Label>
              <div className="col-span-3">{selectedEvent?.end_date}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Definir solicitud:</Label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() =>
                selectedEvent &&
                newStatus &&
                handleStatusChange(selectedEvent.id, newStatus)
              }
              disabled={!newStatus}
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
