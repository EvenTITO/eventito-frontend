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
import { useAddMember } from "@/hooks/manage/membersHooks";

export default function AddMemberButton() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  const { mutateAsync: addMember, isPending, error } = useAddMember();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && role) {
      await addMember({
        newMemberEmail: member,
        newMemberRole: role,
      });
      setEmail("");
      setRole("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar miembro</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar nuevo miembro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email del miembro</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!email}
              isLoading={isPending}
            >
              Agregar autor
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
