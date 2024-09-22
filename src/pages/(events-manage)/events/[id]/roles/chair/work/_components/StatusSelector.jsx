import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORKS_STATUS_LABELS } from "@/lib/Constants"

export default function StatusSelector() {
  const [status, setStatus] = useState(null);
  const statusOptions = Object.values(WORKS_STATUS_LABELS);

  return (
    <div className="flex gap-2 items-center">
      <span>Estado de entrega: </span>
      <Select value={status} onValueChange={(s) => setStatus(s)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statusOptions.map((s) => (
              <SelectItem value={s}>{s}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
