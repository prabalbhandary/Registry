import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";
import skeleton from "../assets/skeleton.png";

const SkeletonOverlay = ({ onPartClick }) => {
  const bodyParts = {
    upperLimb: [
      {
        name: "Clavicle",
        top: "20%",
        left: "50%",
        link: "/clavicle",
        position: "right",
      },
      {
        name: "Scapula",
        top: "25%",
        left: "40%",
        link: "/scapula",
        position: "left",
      },
      {
        name: "Humerus",
        top: "35%",
        left: "35%",
        link: "/humerus",
        position: "left",
      },
      {
        name: "Radius & Ulna",
        top: "52%",
        left: "25%",
        link: "/radius_and_ulna",
        position: "right",
      },
      {
        name: "Hand",
        top: "70%",
        left: "20%",
        link: "/hand",
        position: "left",
      },
    ],
    lowerLimb: [
      {
        name: "Femur",
        top: "60%",
        left: "45%",
        link: "/femur",
        position: "right",
      },
      {
        name: "Tibia & Fibula",
        top: "77%",
        left: "45%",
        link: "/tibia_and_fibula",
        position: "right",
      },
      {
        name: "Patella",
        top: "66%",
        left: "50%",
        link: "/patella",
        position: "left",
      },
      {
        name: "Foot",
        top: "93%",
        left: "45%",
        link: "/foot",
        position: "right",
      },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <img
        src={skeleton}
        alt="skeleton"
        className="w-full h-auto object-contain"
      />
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(bodyParts).flatMap(([limb, parts], index) =>
          parts.map((part, idx) => {
            const isLeft = part.position === "left";
            const labelOffset = isLeft ? "-150px" : "110%";
            const lineStart = isLeft ? "-10px" : "100%";

            return (
              <React.Fragment key={`${limb}-${idx}`}>
                {/* Line */}
                <div
                  className="absolute h-[2px] bg-blue-500"
                  style={{
                    top: part.top,
                    left: lineStart,
                    width: isLeft ? "50px" : "50px",
                    transform: "translateY(-50%)",
                  }}
                ></div>

                {/* Clickable Label */}
                <button
                  onClick={() => {
                    onPartClick(part.name);
                    navigate(part.link);
                  }}
                  className="absolute z-10 text-white bg-blue-600 text-xs sm:text-sm px-2 py-1 rounded pointer-events-auto hover:bg-blue-700 transition"
                  style={{
                    top: part.top,
                    left: labelOffset,
                    transform: "translateY(-50%)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {part.name}
                </button>
              </React.Fragment>
            );
          })
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
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
          Click on Body Part Labels for Details
        </h2>
        <SkeletonOverlay onPartClick={handleBodyPartClick} />
      </section>
    </>
  );
};

export default AddSurgicalDetails;
