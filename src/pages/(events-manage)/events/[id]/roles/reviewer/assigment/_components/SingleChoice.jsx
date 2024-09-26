import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function SingleChoice({ options, value, onChange }) {
  return (
    <div className="flex flex-col gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            "p-4 border rounded-lg cursor-pointer transition-all",
            value === option
              ? "border-primary bg-primary/10"
              : "border-gray-200 hover:border-primary",
          )}
          onClick={() => onChange(option)}
        >
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2",
                value === option
                  ? "border-primary bg-primary"
                  : "border-gray-400",
              )}
            ></div>
            <h3 className="">{option}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
