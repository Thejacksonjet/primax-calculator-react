// src/components/CalculatorForm.jsx
import React, { useEffect, useState } from 'react';

const CalculatorForm = ({
  chickenType,
  setChickenType,
  numberOfChickens,
  setNumberOfChickens,
  existingTools,
  setExistingTools,
  onCalculate,
  onReset,
  language,
}) => {
  // State to track if numberOfChickens is a multiple of 50
  const [isMultipleOf50, setIsMultipleOf50] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chickenType) return; // Prevent calculation if no chicken type is selected
    if (!isMultipleOf50) {
      alert(
        language === 'English'
          ? 'Please input a number in multiples of 50 (e.g., 50, 100, 150).'
          : 'Tafadhali weka namba kwa viwango vya 50 (mfano, 50, 100, 150).'
      );
      return;
    }
    onCalculate(chickenType, numberOfChickens, existingTools);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && chickenType && numberOfChickens) {
        onCalculate(chickenType, numberOfChickens, existingTools);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [chickenType, numberOfChickens, existingTools, onCalculate]);

  const handleToolChange = (tool, value) => {
    const quantity = value === '' ? 0 : parseInt(value, 10) || 0;
    setExistingTools((prev) => ({
      ...prev,
      [tool]: quantity,
    }));
  };

  const handleChickenChange = (e) => {
    const value = e.target.value;
    // Update numberOfChickens with raw input value (no rounding)
    setNumberOfChickens(value);

    // Validate if the value is a multiple of 50
    const numValue = Number(value);
    if (value === "" || isNaN(numValue)) {
      setIsMultipleOf50(true); // No error if empty or invalid
    } else {
      setIsMultipleOf50(numValue % 50 === 0);
    }
  };

  const tools = [
    'Drinkers (10L)',
    'Feeders',
    'Plate Feeders',
    'Thermal Lamps (250W)',
    'White Bulbs (7W)',
    'Thermometer',
  ];

  const isCalculateDisabled = !chickenType; // Disable if chickenType is empty

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {language === 'English' ? 'Chicken Type' : 'Aina ya Kuku'}
          </label>
          <select
            value={chickenType}
            onChange={(e) => setChickenType(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200"
          >
            <option value="" disabled>
              {language === 'English' ? 'Select Chicken Type' : 'Chagua Aina ya Kuku'}
            </option>
            <option value="Hybrid">
              {language === 'English' ? 'Hybrid' : 'Chotara'}
            </option>
            <option value="Broilers">
              {language === 'English' ? 'Broilers' : 'Kuku wa Nyama'}
            </option>
            <option value="Layers">
              {language === 'English' ? 'Layers' : 'Kuku wa Mayai'}
            </option>
          </select>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 font-semibold mb-2">
            {language === 'English' ? 'Number of Chickens' : 'Idadi ya Kuku'}
          </label>
          <input
            type="number"
            value={numberOfChickens || ''} // Handle empty string
            onChange={(e) => handleChickenChange(e)}
            min="50"
            step="50" // Allow any whole number, validation handled separately
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200 appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:w-6 [&::-webkit-outer-spin-button]:h-6 [&::-webkit-outer-spin-button]:bg-green-500 [&::-webkit-outer-spin-button]:text-white [&::-webkit-outer-spin-button]:rounded-full [&::-webkit-inner-spin-button]:w-6 [&::-webkit-inner-spin-button]:h-6 [&::-webkit-inner-spin-button]:bg-green-500 [&::-webkit-inner-spin-button]:text-white [&::-webkit-inner-spin-button]:rounded-full"
            placeholder="50"
          />
          {/* Display error message if numberOfChickens is not a multiple of 50 */}
          {!isMultipleOf50 && numberOfChickens !== "" && (
            <p className="text-red-400 text-sm mt-2">
              {language === 'English'
                ? "Input number in multiples of 50 e.g., 50, 100, 150"
                : "Weka namba kwa viwango vya 50 mfano, 50, 100, 150"}
            </p>
          )}
        </div>
        {/*<div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {language === 'English'
              ? 'Existing Tools (Enter quantity, leave empty if none)'
              : 'Zana Zilizopo (Ingiza idadi, acha wazi kama huna)'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div key={tool} className="flex items-center">
                <label htmlFor={tool} className="text-gray-600 mr-2">
                  {tool}
                </label>
                <input
                  type="number"
                  id={tool}
                  value={existingTools[tool] || ''}
                  onChange={(e) => handleToolChange(tool, e.target.value)}
                  min="0"
                  className="w-20 p-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition duration-200"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div> */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isCalculateDisabled}
            className={`flex-1 bg-green-600 text-white p-3 rounded-lg border border-gray-500 transition duration-200 shadow-md ${
              isCalculateDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'
            }`}
          >
            {language === 'English' ? 'Calculate' : 'Piga hesabu'}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 bg-gray-500 text-white p-3 rounded-lg border border-gray-500 hover:bg-gray-600 transition duration-200 shadow-md"
          >
            {language === 'English' ? 'Reset' : 'Weka upya'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
