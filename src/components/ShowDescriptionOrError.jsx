import {
  CardDescription,
} from "@/components/ui/card"
import { CircleX } from "lucide-react";

export default function ShowDescriptionOrError({ description, error, setError, errorMessage }) {
  if (error) {
    return (
      <CardDescription>
        <div className="flex items-center justify-around p-2 py-3 text-black font-semibold bg-red-200">
          {errorMessage}
          <button onClick={() => setError(false)}>
            <CircleX />
          </button>
        </div>
      </CardDescription>
    );
  } else {
    return (
      <CardDescription>
        {description}
      </CardDescription>
    );
  }
}
