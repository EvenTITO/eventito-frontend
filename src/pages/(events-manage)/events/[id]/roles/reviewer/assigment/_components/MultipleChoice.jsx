import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function MultipleChoice({ options, value, onChange }) {
  const handleChange = (option, checked) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((item) => item !== option));
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            "flex items-center space-x-2 rounded-lg border p-4 transition-colors",
            value.includes(option)
              ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950"
              : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900",
          )}
        >
          <Checkbox
            id={`option-${option}`}
            checked={value.includes(option)}
            onCheckedChange={(checked) => handleChange(option, checked)}
            className="h-5 w-5 rounded border-2 border-primary"
          />
          <Label
            htmlFor={`option-${option}`}
            className="flex-grow text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
}
