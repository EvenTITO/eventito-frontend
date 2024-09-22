import React from "react";
import { Textarea } from "@/components/ui/textarea";

export default function TextInput({ value, onChange, placeholder }) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[150px]"
    />
  );
}
