
import { ShieldCheck, MapPin, DollarSign, FileCheck } from "lucide-react";

const reasons = [
  {
    icon: <DollarSign className="text-green-500 w-8 h-8" />,
    title: "No Brokers Needed",
    desc: "Save up to 10% commission. Direct owner-to-buyer verification with zero middlemen.",
    color: "from-green-100 to-green-50",
  },
  {
    icon: <ShieldCheck className="text-blue-500 w-8 h-8" />,
    title: "100% Legal Trust",
    desc: "Every land record is cross-verified by certified lawyers for complete legal assurance.",
    color: "from-blue-100 to-blue-50",
  },
  {
    icon: <MapPin className="text-purple-500 w-8 h-8" />,
    title: "Govt Map & Survey Match",
    desc: "We instantly match your plot with government survey maps for verified boundaries.",
    color: "from-purple-100 to-indigo-50",
  },
  {
    icon: <FileCheck className="text-pink-500 w-8 h-8" />,
    title: "Transparent & Affordable Plans",
    desc: "Choose from flexible plans designed for all — from quick checks to full legal verification.",
    color: "from-pink-100 to-rose-50",
  },
];

export default function WhyUsPage() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-100 min-h-screen text-center">
      <h2
        className="text-4xl font-extrabold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose <span className="text-purple-600">InfoLand?</span> 🌟
      </h2>

      <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
        We’re redefining land transactions with trust, technology, and transparency.
        Here’s what makes us truly exceptional.
      </p>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {reasons.map((r, i) => (
          <div
            key={i}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`bg-gradient-to-br ${r.color} w-80 rounded-3xl p-8 text-left shadow-xl hover:shadow-2xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white opacity-60 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white rounded-full shadow-md">
                  {r.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{r.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-gray-500 text-sm">
        💡 InfoLand is built with experts, verified data, and transparency at its core.
      </div>
    </div>
  );
}
