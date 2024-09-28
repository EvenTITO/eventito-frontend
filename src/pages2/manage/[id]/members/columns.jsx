import * as React from "react";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {changeMemberRole} from "@/services/api/events/members/mockData";
import {useParams} from "react-router-dom";
import {updateMemberRole} from "@/services/api/events/members/hooks";
import {CHAIR_ROLE, EVENT_ROLES_LABELS, ORGANIZER_ROLE} from "@/lib/Constants.js";

export const columns = [
  {
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "username",
    header: ({column}) => {
      return (
        <Button
          variant="table"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({row}) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "role",
    header: () => (
      <Button variant="table" className="text-black text-right" disabled>
        Rol
      </Button>
    ),
    cell: ({row}) => {
      const [selectedRole, setSelectedRole] = React.useState(
        row.getValue("role"),
      );
      const {mutate} = updateMemberRole();
      const {id: eventId} = useParams();

      function onValueChange(newRole) {
        mutate({userId: row.original.id, eventId: eventId, newRole: newRole});
        changeMemberRole(row.getValue("email"), newRole);

        setSelectedRole(newRole);
      }

      return (
        <Select value={selectedRole} onValueChange={onValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={selectedRole ? selectedRole : "Seleccionar rol"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ORGANIZER_ROLE} className="">
                {EVENT_ROLES_LABELS[ORGANIZER_ROLE]}
              </SelectItem>
              <SelectItem value={CHAIR_ROLE} className="">
                {EVENT_ROLES_LABELS[CHAIR_ROLE]}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
