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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, ChevronRight } from "lucide-react";

export default function AdminPage() {
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
    // Add more sample events here...
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
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, status: newStatus } : event,
      ),
    );
    setSelectedEvent(null);
    setNewStatus("");
  };

  const handleRoleChange = (id, newRole) => {
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
    <div className="container mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="space-x-2">
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            onClick={() => setActiveTab("events")}
          >
            Events
          </Button>
          <Button
            variant={activeTab === "members" ? "default" : "outline"}
            onClick={() => setActiveTab("members")}
          >
            Members
          </Button>
        </div>
      </header>
      <Separator className="my-4" />

      {activeTab === "events" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Events</h2>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="cursor-pointer hover:bg-gray-100 group"
                >
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell className="text-right">
                    <span className="invisible group-hover:visible text-primary flex items-center justify-end">
                      View event <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {activeTab === "members" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Members</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2 flex-grow">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Event Creator">Event Creator</SelectItem>
                <SelectItem value="No Role">No Role</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Select
                      value={member.role}
                      onValueChange={(value) =>
                        handleRoleChange(member.id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrator">
                          Administrator
                        </SelectItem>
                        <SelectItem value="Event Creator">
                          Event Creator
                        </SelectItem>
                        <SelectItem value="No Role">No Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

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
              <Label className="text-right">Organizer</Label>
              <div className="col-span-3">{selectedEvent?.organizer}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Location</Label>
              <div className="col-span-3">{selectedEvent?.location}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Contact</Label>
              <div className="col-span-3">{selectedEvent?.contact}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Organized by</Label>
              <div className="col-span-3">{selectedEvent?.organized_by}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Description</Label>
              <div className="col-span-3">{selectedEvent?.description}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Event Type</Label>
              <div className="col-span-3">{selectedEvent?.event_type}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Start Date</Label>
              <div className="col-span-3">{selectedEvent?.start_date}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">End Date</Label>
              <div className="col-span-3">{selectedEvent?.end_date}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Define the status:</Label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEvent(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedEvent &&
                newStatus &&
                handleStatusChange(selectedEvent.id, newStatus)
              }
              disabled={!newStatus}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
