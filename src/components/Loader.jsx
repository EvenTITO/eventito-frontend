import { Loader2 } from "lucide-react";

export default function Component({ size = 60, className = "" }) {
  return (
    <div className="flex items-center justify-center min-h-screen" role="status">
      <Loader2
        className={`animate-spin text-primary ${className}`}
        size={size}
        aria-hidden="true"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
