import React from "react";
import { FaCheck } from "react-icons/fa";

const SecondNavbar = ({ completedIndex }) => {
  const numbers = ["01", "02", "03", "04", "05"];

  return (
    <div className="flex space-x-4 justify-center items-center">
      {numbers.map((number, index) => (
        <div 
          key={index + 1} 
          className={`relative p-4 cursor-pointer rounded-full transition-all duration-300 ease-in-out transform ${
            completedIndex > index ? "bg-blue-500 text-white shadow-xl scale-110" : "bg-gray-200 text-gray-800"
          }`}
          style={{
            borderRight: index < numbers.length - 1 ? "2px solid #ddd" : "none",
            padding: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
          }}
        >
          {completedIndex > index ? (
            <span className="text-2xl absolute inset-0 flex items-center justify-center">
              <FaCheck />
            </span>
          ) : (
            <span className="text-xl font-semibold">{number}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SecondNavbar;
