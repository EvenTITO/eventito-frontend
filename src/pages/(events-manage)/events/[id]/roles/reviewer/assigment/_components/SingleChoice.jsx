import React from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function SingleChoice({ options, value, onChange }) {
  console.log(options, value);
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <RadioGroup.Item
            value={option}
            id={`option-${option}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`option-${option}`}
            className="flex flex-1 items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-100 [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50"
          >
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 rounded-full border border-gray-300 flex items-center justify-center peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500">
                <div className="w-2 h-2 rounded-full bg-white hidden peer-data-[state=checked]:block" />
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
