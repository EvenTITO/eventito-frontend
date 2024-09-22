import { TableHeader } from "./ui/table";

export default function TableHeaderTitle({children, headerColor}) {
  return (
    <TableHeader className={headerColor ||"bg-slate-50"}>
      {children}
    </TableHeader>
  );
}
