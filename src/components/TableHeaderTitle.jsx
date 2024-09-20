import { TableHeader } from "./ui/table";

export default function TableHeaderTitle({children}) {
  return (
    <TableHeader className="bg-slate-50">
      {children}
    </TableHeader>
  );
}
