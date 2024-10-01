import React from 'react'
import { cn } from '@/lib/utils'

export default function MultipleChoice({ options, value, onChange }) {
  const handleOptionClick = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            'p-4 border rounded-lg cursor-pointer transition-all',
            value.includes(option)
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 hover:border-primary'
          )}
          onClick={() => handleOptionClick(option)}
        >
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                'w-4 h-4 rounded border-2',
                value.includes(option)
                  ? 'border-primary bg-primary'
                  : 'border-gray-400'
              )}
            >
              {value.includes(option) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <h3 className="">{option}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
