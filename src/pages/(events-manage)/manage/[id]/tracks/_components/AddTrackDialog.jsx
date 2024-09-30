import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { useAddTrack } from "@/hooks/manage/tracksHooks";

export default function AddTrackDialog({onSave}) {
  const [track, setTrack] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (track) {
      onSave(track);
      setTrack("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar track</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo track</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="track">Título del track</Label>
            <Input
              id="track"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!track}
            //isLoading={isPending}
            >
              Continuar
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
