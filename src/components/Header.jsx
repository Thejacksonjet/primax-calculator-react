// src/components/Header.jsx
import React, { useState } from "react";
import primaxLogo from "../assets/primax-logo.png"; // Adjust the path if necessary

const Header = ({ onLanguageChange }) => {
  const [language, setLanguage] = useState("Swahili");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="flex justify-between items-center max-sm:px-0 px-2 py-2 bg-green-600 text-white shadow-md">
      <div className="flex items-center">
        <img
          src={primaxLogo}
          alt="Primax Logo"
          className="max-sm:ml-0 ml-1 h-16" // Adjust height (h-8 = 2rem) and margin-right (mr-2 = 0.5rem) as needed
        />
        <h1 className="text-xl font-bold">Fuga Calculator</h1>
      </div>
      <div className="flex justify-center mr-2">
      <button
          onClick={() => handleLanguageChange("Swahili")}
          className={`px-4 py-2 rounded ml-2 mt-2 ${
            language === "Swahili" ? "bg-green-700 hover:bg-green-800 text-white" : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          Kiswahili
        </button>
        <button
          onClick={() => handleLanguageChange("English")}
          className={`px-4 py-2 rounded ml-2 mt-2 ${
            language === "English" ? "bg-green-700 hover:bg-green-800 text-white" : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          English
        </button>
      
      </div>
    </div>
  );
};

export default Header;
