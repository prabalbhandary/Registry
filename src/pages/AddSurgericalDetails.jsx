import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";
import skeleton from "../assets/skeleton.png";

const SkeletonOverlay = ({ onPartClick }) => {
  const bodyParts = {
    upperLimb: [
      { name: "Clavicle", top: "24%", left: "64%", link: "/clavicle" },
      { name: "Scapula", top: "30%", left: "30%", link: "/scapula" },
      { name: "Humerus", top: "36%", left: "24%", link: "/humerus" },
      {
        name: "Radius & Ulna",
        top: "53%",
        left: "25%",
        link: "/radius_and_ulna",
      },
      { name: "Hand", top: "64%", left: "15%", link: "/hand" },
    ],
    lowerLimb: [
      { name: "Femur", top: "62%", left: "40%", link: "/femur" },
      { name: "Patella", top: "72%", left: "50%", link: "/patella" },
      {
        name: "Tibia & Fibula",
        top: "83%",
        left: "50%",
        link: "/tibia_and_fibula",
      },
      { name: "Foot", top: "96%", left: "50%", link: "/foot" },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[600px] mx-auto rounded-xl overflow-hidden bg-white">
      <img
        src={skeleton}
        alt="Skeleton Diagram"
        className="w-full h-auto object-contain"
      />
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(bodyParts).flatMap(([limb, parts]) =>
          parts.map((part, idx) => (
            <button
              key={`${limb}-${idx}`}
              onClick={() => {
                onPartClick(part.name);
                navigate(part.link);
              }}
              className="absolute z-10 pointer-events-auto bg-blue-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all"
              style={{
                top: part.top,
                left: part.left,
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
              }}
            >
              {part.name}
            </button>
          ))
        )}
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

  return (
    <>
      <title>Patient Surgical Details - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <section className="px-4 sm:px-8 md:px-16 mt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Select a Part to Proceed
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Click on the skeleton image to continue
          </p>
        </div>
        <SkeletonOverlay onPartClick={handleBodyPartClick} />
      </section>
    </>
  );
};

export default AddSurgicalDetails;
