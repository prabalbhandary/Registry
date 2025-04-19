import React, { useState } from "react";
import Select from "react-select";
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
        left: "45%",
        width: "10%",
        height: "5%",
        link: "/clavicle",
      },
      {
        name: "Scapula",
        top: "25%",
        left: "35%",
        width: "10%",
        height: "10%",
        link: "/scapula",
      },
      {
        name: "Humerus",
        top: "35%",
        left: "30%",
        width: "10%",
        height: "20%",
        link: "/humerus",
      },
      {
        name: "Radius & Ulna",
        top: "50%",
        left: "20%",
        width: "10%",
        height: "20%",
        link: "/radius_and_ulna",
      },
      {
        name: "Hand",
        top: "70%",
        left: "15%",
        width: "10%",
        height: "10%",
        link: "/hand",
      },
    ],
    lowerLimb: [
      {
        name: "Femur",
        top: "60%",
        left: "40%",
        width: "10%",
        height: "20%",
        link: "/femur",
      },
      {
        name: "Tibia & Fibula",
        top: "75%",
        left: "40%",
        width: "10%",
        height: "20%",
        link: "/tibia_and_fibula",
      },
      {
        name: "Patella",
        top: "65%",
        left: "45%",
        width: "5%",
        height: "5%",
        link: "/patella",
      },
      {
        name: "Foot",
        top: "90%",
        left: "40%",
        width: "10%",
        height: "10%",
        link: "/foot",
      },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img src={skeleton} alt="skeleton" className="w-full h-auto opacity-50" />
      <div className="absolute inset-0">
        {Object.entries(bodyParts).map(([limb, parts]) =>
          parts.map((part, index) => (
            <button
              key={`${limb}-${index}`}
              onClick={() => {
                onPartClick(part.name);
                navigate(part.link);
              }}
              className="absolute hover:bg-blue-200/50 focus:outline-none"
              style={{
                top: part.top,
                left: part.left,
                width: part.width,
                height: part.height,
                cursor: "pointer",
              }}
              title={part.name}
            >
              <span className="text-xs text-white bg-blue-500/50 rounded px-1">
                {part.name}
              </span>
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
      <section>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center mb-4">
            Click on Body Parts for Details
          </h2>
          <SkeletonOverlay onPartClick={handleBodyPartClick} />
        </div>
      </section>
    </>
  );
};

export default AddSurgicalDetails;
