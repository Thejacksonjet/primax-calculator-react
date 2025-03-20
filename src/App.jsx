// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";
import BirdImage from "./components/BirdImage";
import CostTable from "./components/CostTable";
import FooterNote from "./components/FooterNote";
import { calculatePoultryCost } from "./utils/api";
import { reduceCosts } from "./utils/costReducer";

function App() {
  const [language, setLanguage] = useState("Swahili");
  const [chickenType, setChickenType] = useState(""); // Changed from 'Broiler' to ''
  const [numberOfChickens, setNumberOfChickens] = useState(50);
  const [existingTools, setExistingTools] = useState({});
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async (
    chickenType,
    numberOfChickens,
    existingTools
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await calculatePoultryCost(
        chickenType,
        numberOfChickens,
        existingTools
      );
      const adjustedData = reduceCosts(data, existingTools);
      setCostData(adjustedData);
    } catch (error) {
      if (error.response) {
        const apiMessage =
          error.response.data.message ||
          "Failed to calculate cost for this chicken type.";
        setError(`${apiMessage} Please check your inputs or contact support.`);
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setChickenType(""); // Reset to empty instead of 'Hybrid'
    setNumberOfChickens(50);
    setExistingTools({});
    setCostData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex flex-col">
      <Header onLanguageChange={setLanguage} />
      <main className="flex-1 container mx-auto max-sm:px-0 px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700">
            {language === "English"
              ? "Poultry Cost Calculator"
              : "Kikokotoo cha Gharama za Ufugaji wa Kuku"}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "English"
              ? "Minimum number is 50 chickens. All calculations are in multiples of 50."
              : "Idadi ya chini ya kuku 50. Hesabu zote ni kwa ongezeko la 50."}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md px-2">
          <div className="flex justify-center">
            <BirdImage chickenType={chickenType} />
          </div>
          <CalculatorForm
            chickenType={chickenType}
            setChickenType={setChickenType}
            numberOfChickens={numberOfChickens}
            setNumberOfChickens={setNumberOfChickens}
            existingTools={existingTools}
            setExistingTools={setExistingTools}
            onCalculate={handleCalculate}
            onReset={handleReset}
            language={language}
          />
          {loading && (
            <div className="text-center mt-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              <p className="text-gray-600 mt-2">
                {language === "English" ? "Loading..." : "Inapakia..."}
              </p>
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}
          {costData && (
            <div className="mt-6 text-center p-4">
              <p className="text-gray-700 font-semibold">
                {language === "English"
                  ? `Cost per chicken: ${costData.costPerChicken.toLocaleString(
                      "en-TZ",
                      { style: "currency", currency: "TZS" }
                    )}`
                  : `Gharama kwa kuku mmoja: ${costData.costPerChicken.toLocaleString(
                      "en-TZ",
                      { style: "currency", currency: "TZS" }
                    )}`}
              </p>
              <p className="text-gray-700 font-semibold mt-2">
                {language === "English"
                  ? `Estimated duration: ${costData.estimatedDurationDays} days`
                  : `Muda unaokadiriwa: ${costData.estimatedDurationDays} siku`}
              </p>
            </div>
          )}
          <CostTable
            data={costData}
            language={language}
            chickenType={chickenType}
            numberOfChickens={numberOfChickens} 
          />
        </div>
      </main>
      <FooterNote language={language} />
    </div>
  );
}

export default App;
