
import { ShieldCheck, BarChart3, AlertTriangle } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-green-50 via-teal-50 to-emerald-100 min-h-screen flex flex-col items-center">
      {/* Title */}
      <h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight"
      >
        Land Transaction Insights 📊
      </h2>

      {/* Intro Card */}
      <div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md border border-teal-100 p-10 rounded-2xl shadow-xl text-center"
      >
        <p className="text-gray-700 text-lg mb-3">
          Every year, over <span className="font-bold text-emerald-600">1.2 million</span> land transactions take place in India.
        </p>
        <p className="text-red-500 font-bold text-2xl">
          ⚠️ Around 22% involve fraudulent or disputed ownership claims.
        </p>
        <p className="text-gray-700 mt-4 text-lg">
          <span className="font-semibold text-teal-700">InfoLand</span> empowers buyers with verified data, reducing fraud risk by up to <b>85%</b>.
        </p>
      </div>

      {/* Animated Stats Cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-3 px-6 max-w-6xl">
        {/* Card 1 */}
        <div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
        >
          <BarChart3 size={40} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">1.2M+ Transactions</h3>
          <p className="text-sm opacity-90 text-center">
            Verified land records analyzed yearly to ensure reliability.
          </p>
        </div>

        {/* Card 2 */}
        <div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-red-500 to-orange-400 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
        >
          <AlertTriangle size={40} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">22% Frauds Detected</h3>
          <p className="text-sm opacity-90 text-center">
            Ownership disputes and fake documentation cases tracked and prevented.
          </p>
        </div>

        {/* Card 3 */}
        <div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-600 to-emerald-500 text-white rounded-2xl p-6 shadow-lg flex flex-col items-center"
        >
          <ShieldCheck size={40} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">85% Safer Deals</h3>
          <p className="text-sm opacity-90 text-center">
            Verified through InfoLand’s AI + legal experts to ensure 100% confidence.
          </p>
        </div>
      </div>

      {/* Footer tagline */}
      <p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-12 text-gray-700 font-medium italic"
      >
        “Transparency today builds trust for tomorrow.” 🌱
      </p>
    </div>
  );
}
