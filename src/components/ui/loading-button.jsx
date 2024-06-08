import { Loader2 } from "lucide-react";
import "./loading-button.css";

export function LoadingButton() {
  return (
    <button className="loading-button" disabled>
      <div className="flex flex-row items-center justify-around">
        <div className="flex">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </div>
      </div>
    </button>
  );
}
