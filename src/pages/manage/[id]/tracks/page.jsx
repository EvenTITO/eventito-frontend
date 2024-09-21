import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";

export default function TracksPage() {
  const [tracks, setTracks] = useState([
    { id: 1, name: "Web Development", memberInCharge: "Alice Johnson" },
    { id: 2, name: "Machine Learning", memberInCharge: "Bob Smith" },
    { id: 3, name: "Cybersecurity", memberInCharge: "Charlie Brown" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleOpenSheet = (track) => {
    setCurrentTrack(track);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTrack) {
      if (currentTrack.id) {
        // Edit existing track
        setTracks(
          tracks.map((t) => (t.id === currentTrack.id ? currentTrack : t)),
        );
      } else {
        // Add new track
        setTracks([...tracks, { ...currentTrack, id: tracks.length + 1 }]);
      }
    }
    setIsOpen(false);
    setCurrentTrack(null);
  };

  const handleDelete = (id) => {
    setTracks(tracks.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tracks</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button onClick={() => handleOpenSheet()}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nuevo track
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {currentTrack?.id ? "Editar track" : "Nuevo track"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="trackName">Nombre</Label>
                <Input
                  id="trackName"
                  value={currentTrack?.name || ""}
                  onChange={(e) =>
                    setCurrentTrack((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter track name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberInCharge">Chair</Label>
                <Input
                  id="memberInCharge"
                  value={currentTrack?.memberInCharge || ""}
                  onChange={(e) =>
                    setCurrentTrack((prev) => ({
                      ...prev,
                      memberInCharge: e.target.value,
                    }))
                  }
                  placeholder="Enter member name"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {currentTrack?.id ? "Update" : "Add"} Track
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Chair</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell className="font-medium">{track.name}</TableCell>
              <TableCell>{track.memberInCharge}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="table"
                  size="icon"
                  onClick={() => handleOpenSheet(track)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="table"
                  size="icon"
                  onClick={() => handleDelete(track.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
