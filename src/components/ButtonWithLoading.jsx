import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ButtonWithLoading({
  onClick,
  isLoading,
  className,
  type,
  text,
  children,
  disabled,
}) {
  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={disabled || isLoading}
      type={type}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        <>
          <span>{text}</span>
          {children}
        </>
      )}
    </Button>
  );
}
