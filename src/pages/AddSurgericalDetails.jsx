import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import skeleton from "../assets/skeleton.png";

const SkeletonOverlay = ({ onPartClick, selectedBodyPart }) => {
  const bodyParts = {
    upperLimb: [
      { name: "Clavicle", top: "24%", left: "64%", link: "/clavicle" },
      { name: "Scapula", top: "32%", left: "64.5%", link: "/scapula" },
      { name: "Humerus", top: "36%", left: "75%", link: "/humerus" },
      {
        name: "Radius & Ulna",
        top: "53%",
        left: "82%",
        link: "/radius_and_ulna",
      },
      { name: "Hand", top: "64%", left: "90%", link: "/hand" },
    ],
    lowerLimb: [
      { name: "Femur", top: "62%", left: "38%", link: "/femur" },
      { name: "Patella", top: "72%", left: "38%", link: "/patella" },
      {
        name: "Tibia & Fibula",
        top: "83%",
        left: "38%",
        link: "/tibia_and_fibula",
      },
      { name: "Foot", top: "96%", left: "38%", link: "/foot" },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[700px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg border border-gray-200 p-6">
      <img
        src={skeleton}
        alt="Skeleton Diagram"
        className="w-full h-auto object-contain opacity-70"
      />
      <div className="absolute inset-0 pointer-events-none p-6">
        {/* Lower Limb Buttons on Left */}
        {bodyParts.lowerLimb.map((part, idx) => (
          <button
            key={`lower-${idx}`}
            onClick={() => {
              onPartClick(part.name);
              navigate(part.link);
            }}
            className={`absolute z-10 pointer-events-auto text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-semibold ${
              selectedBodyPart === part.name
                ? "bg-green-600 ring-2 ring-green-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400"
            }`}
            style={{
              top: part.top,
              left: part.left,
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="flex items-center gap-1">
              {selectedBodyPart === part.name && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {part.name}
            </span>
          </button>
        ))}

        {/* Upper Limb Buttons on Right */}
        {bodyParts.upperLimb.map((part, idx) => (
          <button
            key={`upper-${idx}`}
            onClick={() => {
              onPartClick(part.name);
              navigate(part.link);
            }}
            className={`absolute z-10 pointer-events-auto text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-semibold ${
              selectedBodyPart === part.name
                ? "bg-green-600 ring-2 ring-green-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400"
            }`}
            style={{
              top: part.top,
              left: part.left,
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="flex items-center gap-1">
              {selectedBodyPart === part.name && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {part.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AddSurgicalDetails = () => {
  const navigate = useNavigate();
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const location = useLocation();
  const [completedIndex, setCompletedIndex] = useState(
    location.state?.completedIndex || 2
  );

  const handleBodyPartClick = (part) => {
    setSelectedBodyPart(part);
    toast.info(`Selected body part: ${part}`);
  };

  const bodyPartCategories = [
    {
      title: "Upper Limb",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      parts: ["Clavicle", "Scapula", "Humerus", "Radius & Ulna", "Hand"],
    },
    {
      title: "Lower Limb",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      parts: ["Femur", "Patella", "Tibia & Fibula", "Foot"],
    },
  ];

  return (
    <>
      <title>Patient Surgical Details - Trauma Registry</title>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Select Injury Location</h1>
                <p className="text-gray-600 text-sm mt-1">Choose the affected body part to begin assessment</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Body Part Categories */}
            <div className="lg:col-span-1 space-y-4">
              {bodyPartCategories.map((category, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.parts.map((part, partIdx) => (
                      <li
                        key={partIdx}
                        className={`flex items-center gap-2 text-sm ${
                          selectedBodyPart === part
                            ? "text-green-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {selectedBodyPart === part ? (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Instructions Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border-2 border-indigo-200 p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">How to Use</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">1.</span>
                        <span>Click on any body part button on the skeleton</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">2.</span>
                        <span>You'll be redirected to the specific assessment form</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">3.</span>
                        <span>Complete the required information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Skeleton Diagram */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Interactive Body Diagram
                  </h2>
                  <p className="text-sm text-gray-600">
                    Click on any highlighted area to select the injury location
                  </p>
                </div>

                <SkeletonOverlay 
                  onPartClick={handleBodyPartClick}
                  selectedBodyPart={selectedBodyPart}
                />

                {/* Selected Body Part Display */}
                {selectedBodyPart && (
                  <div className="mt-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-green-800">Selected Body Part</h3>
                        <p className="text-lg font-bold text-green-900">{selectedBodyPart}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Available</p>
                      <p className="text-xs text-gray-600">Click to select</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Selected</p>
                      <p className="text-xs text-gray-600">Currently chosen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AddSurgicalDetails;