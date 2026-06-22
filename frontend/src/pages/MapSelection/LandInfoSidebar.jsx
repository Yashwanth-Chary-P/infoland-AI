// src/components/LandInfoSidebar.jsx
import React from "react";
import "../CSS/Sidebar.css";

const LandInfoSidebar = ({ landDetails, showPlans, setShowPlans, plans }) => {
  if (!landDetails) return null;

  return (
    <div className="sidebar">
      <h3>{landDetails.name}</h3>
      <p><b>Owner:</b> {landDetails.owner}</p>
      <p><b>Survey No:</b> {landDetails.surveyNo}</p>
      <p><b>Area:</b> {landDetails.area}</p>
      <p><b>Village:</b> {landDetails.village}</p>
      <p><b>District:</b> {landDetails.district}</p>
      <p><b>Type:</b> {landDetails.type}</p>
      <p><b>Registration:</b> {landDetails.registrationYear}</p>
      <p style={{ color: "#dc2626" }}>
        <b>Status:</b> {landDetails.verifiedStatus}
      </p>

      <button
        className="btn-toggle-plans"
      >
        View Background Verification
      </button>
    </div>
  );
};

export default LandInfoSidebar;
