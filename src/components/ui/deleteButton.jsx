import * as React from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DeleteButton = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-center h-10 w-10 p-2 rounded-md border border-danger text-danger bg-transparent hover:bg-danger hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <Trash2 className="h-5 w-5" />
  </button>
));
DeleteButton.displayName = "DeleteButton";

export { DeleteButton };
