import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonWithLoading({
  onClick,
  isLoading,
  className,
  text,
}) {
  return (
    <Button onClick={onClick} className={className} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
}
