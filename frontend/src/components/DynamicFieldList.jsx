import React from "react";

const formatLabel = (key) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DynamicFieldList = ({ data, excludedKeys = [], preferredOrder = [], labelMap = {} }) => {
  if (!data || typeof data !== "object") return null;

  const keys = Object.keys(data).filter(
    (key) => !excludedKeys.includes(key) && data[key] !== null && data[key] !== undefined && data[key] !== ""
  );

  // Sort keys: preferred order first, then alphabetical
  keys.sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  if (keys.length === 0) {
    return <p className="text-sm text-gray-500">No data available.</p>;
  }

  return (
    <div className="mt-2 space-y-1 text-sm">
      {keys.map((key) => {
        const label = labelMap[key] || formatLabel(key);
        let value = data[key];

        if (typeof value === "boolean") {
          value = value ? "Yes" : "No";
        } else if (Array.isArray(value)) {
          value = value.join(", ");
        } else if (typeof value === "object") {
          value = JSON.stringify(value);
        }

        return (
          <p key={key}>
            <b>{label}:</b> <span className="text-gray-700">{value}</span>
          </p>
        );
      })}
    </div>
  );
};

export default DynamicFieldList;
