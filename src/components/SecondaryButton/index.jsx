import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import "./styles.css";

export default function SecondaryButton({ children, onClick, className }) {
  return (
    <Button
      className={cn(
        "text-eventitoBlue hover:text-eventitoBlue border border-gray-300",
        className,
      )}
      variant="outline"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
