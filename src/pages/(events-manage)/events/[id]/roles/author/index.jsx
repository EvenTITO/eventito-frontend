import React, { useState } from "react";

export default function AuthorPage() {
  return <LineTabs tabs={tabs} selected={"General"} />;
}

function LineTabs({ tabs, selected }) {
  const [selectedTab, setSelectedTab] = useState(selected || tabs[0].label);

  return (
    <div className="w-full max-w-3xl">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out
              ${
                selectedTab === tab.label
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }
              `}
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

const tabs = [
  { label: "General", component: <div>General</div> },
  { label: "Info", component: <div>Info</div> },
  { label: "Calendario", component: <div>Calendario</div> },
  { label: "Presentaciones", component: <div>Presentaciones</div> },
];
