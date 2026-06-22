import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic Verification",
    emoji: "🟩",
    price: "₹499",
    desc: "Quick property background check before shortlisting.",
    includes: [
      "Fetch data from government records",
      "Ownership & boundary verification",
      "Instant digital report",
    ],
    color: "from-green-100 to-green-200",
  },
  {
    name: "Standard Legal Verification",
    emoji: "🟦",
    price: "₹1,999",
    desc: "Expert-reviewed verification for confident property purchase.",
    includes: [
      "Includes all Basic checks",
      "Document review by legal experts",
      "Dispute & mortgage validation",
    ],
    color: "from-blue-100 to-blue-200",
  },
  {
    name: "Premium + Field Check",
    emoji: "🟧",
    price: "₹4,999",
    desc: "Comprehensive verification with field inspection and legal opinion.",
    includes: [
      "Includes all Standard checks",
      "On-ground verification & site visit",
      "Lawyer-signed legal report",
    ],
    color: "from-orange-100 to-yellow-100",
  },
];

export default function PlansSection() {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    console.log("Selected plan:", plan);
    // ✅ Navigate to checkout page with plan data
    navigate("/checkout", { state: { selectedPlan: plan } });
  };

  return (
    <section
      id="plans"
      className="pt-24 pb-20 bg-gradient-to-bl from-sky-50 to-indigo-100 min-h-screen text-center"
    >
      <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
        Choose Your Verification Plan
      </h2>

      <p className="text-gray-600 mb-16 text-lg max-w-2xl mx-auto leading-relaxed">
        Get verified land reports powered by government data and reviewed by professionals.
      </p>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`relative bg-gradient-to-b ${p.color} rounded-3xl shadow-xl w-80 overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform transform hover:-translate-y-1`}
          >
            <div className="absolute inset-0 bg-white opacity-70 blur-2xl" />
            <div className="relative p-8 text-left">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-800">{p.name}</h3>
                <span className="text-3xl">{p.emoji}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-5 italic leading-snug">{p.desc}</p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-extrabold text-blue-700">{p.price}</p>
                <p className="text-sm text-gray-500 font-medium">One-time payment</p>
              </div>

              {/* Features */}
              <ul className="text-gray-700 space-y-2 mb-8 list-disc list-inside">
                {p.includes.map((f, j) => (
                  <li key={j} className="leading-relaxed">
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => handleSelectPlan(p)}
                className="w-full bg-blue-700 text-white rounded-full px-6 py-3 text-lg font-semibold shadow-md hover:bg-blue-800 hover:shadow-lg transition"
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-gray-500 text-sm">
        ✨ Trusted by buyers, lawyers, and real estate professionals across India.
      </div>
    </section>
  );
}
