import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PencilIcon } from "lucide-react";
import { format } from "date-fns";

export default function GeneralPage() {
  const [eventInfo, setEventInfo] = useState({
    title: "Pycon 2024",
    startDate: new Date(2023, 8, 15),
    endDate: new Date(2023, 8, 17),
    location: "FIUBA",
    contactName: "Depto. de informatica",
    contactEmail: "informatica@fi.uba.ar",
  });

  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEventInfo((prev) => ({ ...prev, [field]: date }));
  };

  const handleSave = () => {
    console.log("Event Information:", eventInfo);
    setEditingField(null);
  };

  const renderEditSheet = (field) => {
    if (!field) return null;

    return (
      <Sheet
        open={editingField === field}
        onOpenChange={(open) => !open && setEditingField(null)}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit {field}</SheetTitle>
            <SheetDescription>
              Make changes to the {field} field here. Click save when you're
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            {field === "title" && (
              <Input
                name="title"
                value={eventInfo.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
              />
            )}
            {(field === "startDate" || field === "endDate") && (
              <Calendar
                mode="single"
                selected={eventInfo[field]}
                onSelect={(date) => handleDateChange(date, field)}
                initialFocus
              />
            )}
            {field === "location" && (
              <Textarea
                name="location"
                value={eventInfo.location}
                onChange={handleInputChange}
                placeholder="Enter event location"
              />
            )}
            {field === "contactEmail" && (
              <Input
                name="contactEmail"
                type="email"
                value={eventInfo.contactEmail}
                onChange={handleInputChange}
                placeholder="Enter contact email"
              />
            )}
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuracion general</h1>
      <div className="space-y-6">
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Detalles del evento</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditingField("title")}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xl mb-2">{eventInfo.title}</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <p>
              <span className="font-medium">Comienzo:</span>{" "}
              {eventInfo.startDate
                ? format(eventInfo.startDate, "PPP")
                : "Not set"}
            </p>
            <p>
              <span className="font-medium">Finalizacion:</span>{" "}
              {eventInfo.endDate ? format(eventInfo.endDate, "PPP") : "Not set"}
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Ubicacion</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditingField("location")}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
          <p>{eventInfo.location}</p>
        </div>

        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Informacion de contacto</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditingField("contactName")}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </div>
          <p>
            <span className="font-medium">Name:</span> {eventInfo.contactName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {eventInfo.contactEmail}
          </p>
        </div>
      </div>
      {renderEditSheet(editingField)}
    </div>
  );
}
