
import { Quote } from "lucide-react";

const opinions = [
  {
    name: "Adv. Rajesh Sharma",
    title: "Land Law Expert",
    quote:
      "InfoLand ensures transparency through verified land records. It’s transforming how people validate ownership and avoid frauds.",
  },
  {
    name: "Adv. Neha Reddy",
    title: "Property Legal Advisor",
    quote:
      "Unlike brokers, InfoLand provides authentic legal background checks backed by certified documentation and digital verification.",
  },
  {
    name: "Adv. Arjun Mehta",
    title: "Real Estate Consultant",
    quote:
      "With government map matching and expert review, InfoLand gives buyers 100% confidence before any land purchase.",
  },
];

export default function LawyerPage() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-tr from-yellow-50 via-amber-100 to-orange-50 min-h-screen text-center">
      {/* Header */}
      <h2
        className="text-4xl font-extrabold text-gray-800 mb-8 relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="relative z-10">Lawyers’ Opinion ⚖️</span>
        <span className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300 rounded-full -z-0"></span>
      </h2>

      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
        Hear what top property lawyers have to say about <b>InfoLand</b> and our
        verified land background system.
      </p>

      {/* Opinion Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {opinions.map((op, i) => (
          <div
            key={i}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="bg-white w-80 p-8 rounded-3xl shadow-xl hover:shadow-2xl relative overflow-hidden border-t-4 border-amber-400"
          >
            <div className="absolute top-4 right-4 opacity-20">
              <Quote size={48} />
            </div>
            <p className="text-gray-700 italic leading-relaxed mb-6">
              “{op.quote}”
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                — {op.name}
              </h3>
              <p className="text-sm text-amber-600">{op.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-gray-500 text-sm">
        🧾 Verified by licensed legal professionals from multiple states across India.
      </div>
    </div>
  );
}
