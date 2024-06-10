import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export default function CustomLoginButton({ isLoading, isSelected, buttonText, handleSubmit, variant }) {
  if (isLoading && isSelected) {
    return (
      <Button type="submit" className="w-full bg-gray-600 font-semibold" onClick={handleSubmit} disabled>
        <div className="flex flex-row items-center justify-around">
          <div className="flex">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Cargando...
          </div>
        </div>
      </Button>
    );
  } else {
    return (
      <Button type="submit" className="w-full" onClick={handleSubmit} variant={variant}>
        {buttonText}
      </Button>
    );
  }
}
