import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TableContent({ title, children, headerColor }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="mt-4">
      <CardHeader
        className={cn(
          "cursor-pointer border-b border-gray-200 p-4",
          headerColor || "bg-gray-50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-base font-medium text-gray-700">
          {title}
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </CardTitle>
      </CardHeader>
      {isOpen ? (
        <CardContent className="p-0">{children}</CardContent>
      ) : null}
    </Card>
  );
}
