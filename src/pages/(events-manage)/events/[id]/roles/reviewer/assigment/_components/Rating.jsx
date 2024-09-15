import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Rating({ value, onChange, lowLabel, highLabel }) {
  const [inputValue, setInputValue] = useState(value.toString());
  const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 10) {
      onChange(numericValue);
    }
  };

  const handleInputBlur = () => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue) || numericValue < 1) {
      setInputValue("1");
      onChange(1);
    } else if (numericValue > 10) {
      setInputValue("10");
      onChange(10);
    } else {
      setInputValue(numericValue.toString());
      onChange(numericValue);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
      <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-4">
        {ratingScale.map((ratingValue) => (
          <motion.button
            key={ratingValue}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(ratingValue)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              ratingValue <= value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            } font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={`Rate ${ratingValue} out of 10`}
          >
            {ratingValue}
          </motion.button>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <label htmlFor="manual-rating" className="sr-only">
          Enter rating manually
        </label>
        <input
          id="manual-rating"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-20 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Manual rating input"
        />
        <span className="ml-2 text-sm text-gray-600">/ 10</span>
      </div>
    </div>
  );
}
