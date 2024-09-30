import { cn } from "@/lib/utils";

export function BottomContainer({ children }) {
  return (
    <div className={cn("py-4 bg-background", "fixed bottom-0 left-0 right-0")}>
      <div className="container mx-auto px-4 max-w-3xl flex justify-between">
        {children}
      </div>
    </div>
  );
}
