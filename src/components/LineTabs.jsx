import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function LineTabs({ tabs, selected, maxWidth = "" }) {
  const [selectedTab, setSelectedTab] = useState(selected || tabs[0].label);

  return (
    <div className={cn("w-full", maxWidth)}>
      <div className="flex border-b border-gray-200 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-2 py-2 font-medium text-sm focus:outline-none ${
              selectedTab === tab.label
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setSelectedTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.label === selectedTab)?.component}
      </div>
    </div>
  );
}