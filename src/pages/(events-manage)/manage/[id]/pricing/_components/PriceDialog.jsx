import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Plus } from "lucide-react";

export default function PriceDialog({ price, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    price || {
      name: "",
      description: "",
      value: 0,
      need_verification: false,
      related_date: null,
      roles: [],
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {price ? (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Edit Price
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Add Price
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{price ? "Edit Price" : "Add New Price"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="need_verification"
              name="need_verification"
              checked={formData.need_verification}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  need_verification: Boolean(checked),
                }))
              }
            />
            <Label htmlFor="need_verification">Requires Verification</Label>
          </div>
          <div>
            <Label htmlFor="related_date">Related Date (optional)</Label>
            <Input
              id="related_date"
              name="related_date"
              type="date"
              value={formData.related_date || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="roles">Roles (comma-separated)</Label>
            <Input
              id="roles"
              name="roles"
              value={formData.roles.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roles: e.target.value.split(",").map((role) => role.trim()),
                }))
              }
            />
          </div>
          <Button type="submit">{price ? "Update" : "Add"} Price</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
