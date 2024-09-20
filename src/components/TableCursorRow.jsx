import { TableRow } from "./ui/table";

export default function TableCursorRow({ key, onClick, children }) {
  return (
    <TableRow
      key={key}
      onClick={onClick}
      className="cursor-pointer hover:bg-muted/50"
    >
      {children}
    </TableRow>
  );
}
