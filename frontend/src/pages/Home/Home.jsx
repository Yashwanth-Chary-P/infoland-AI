

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ----- Swiper (v11) ----- */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/* ----- Charts ----- */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

/* ----- Icons ----- */
import { Building, MapPin, Users, ShieldCheck, FileCheck, ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

/* ---------------- DATA ---------------- */
const heroSlides = [
  {
    id: 1,
    title: "Don't Fall Into the 84% Trap",
    subtitle: "Most fraud happens due to lack of awareness — verify before you buy.",
    image: "https://picsum.photos/seed/land1/1200/800.jpg",
    buttonText: "Verify map",
    buttonLink: "/map",
    badge: "⚠️ Critical Warning",
  },
  {
    id: 2,
    title: "Broker Charge = Plots + Full Background Check",
    subtitle: "For the same cost, get verified plots + complete legal verification.",
    image: "https://picsum.photos/seed/land2/1200/800.jpg",
    buttonText: "View Plots",
    buttonLink: "/plot",
    badge: "💰 Save Money",
  },
  {
    id: 3,
    title: "Lawyer-Certified Safety Report",
    subtitle: "Legal experts verify documents and issue a trusted legitimacy certificate.",
    image: "https://picsum.photos/seed/land3/1200/800.jpg",
    buttonText: "Get cards",
    buttonLink: "/cards",
    badge: "🔒 100% Secure",
  },
];

const features = [
  { icon: MapPin, label: "Interactive Maps", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: Building, label: "Construction Insights", color: "text-green-600", bg: "bg-green-100" },
  { icon: Users, label: "Expert Recommendations", color: "text-purple-600", bg: "bg-purple-100" },
  { icon: ShieldCheck, label: "Fraud Prevention", color: "text-amber-600", bg: "bg-amber-100" },
];

const pieData = {
  labels: ["Fraud/Dispute Risk", "Safe Transactions"],
  datasets: [
    {
      data: [22, 78],
      backgroundColor: ["#ef4444", "#10b981"],
      hoverOffset: 6,
    },
  ],
};

const savingContent = {
  heading: "Save Money, Time & Legal Risk",
  text: "Our platform replaces costly broker charges and manual legal processes with an automated, lawyer-verified system — reducing fraud risk dramatically.",
  percentage: 85,
};

const graphData = {
  labels: ["Without Verification Platform", "With Verification"],
  datasets: [
    {
      label: "Fraud Risk (%)",
      data: [22, 3],
      backgroundColor: ["#ef4444", "#10b981"],
      borderRadius: 8,
    },
  ],
};

const whyUs = [
  { icon: ShieldCheck, title: "Lawyer Verified", desc: "Every property is checked and certified by legal experts." },
  { icon: MapPin, title: "Verified Plots on Map", desc: "Explore plots with full background checks and legal clarity." },
  { icon: FileCheck, title: "Deep Legal Background Check", desc: "We detect disputes, court cases, encumbrances and fraud." },
  { icon: Building, title: "Trusted Builder Network", desc: "Connect with pre-screened and reliable construction partners." },
];

/* ---------------- Custom Navigation Components ---------------- */
const CustomNavigation = ({ swiper }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiper) return;

    const updateState = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on('slideChange', updateState);
    swiper.on('reachBeginning', updateState);
    swiper.on('reachEnd', updateState);
    
    updateState();

    return () => {
      swiper.off('slideChange', updateState);
      swiper.off('reachBeginning', updateState);
      swiper.off('reachEnd', updateState);
    };
  }, [swiper]);

  return (
    <>
      <button
        onClick={() => swiper?.slidePrev()}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
          isBeginning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110'
        }`}
        disabled={isBeginning}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={() => swiper?.slideNext()}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
          isEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110'
        }`}
        disabled={isEnd}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
};

/* ---------------- Components ---------------- */
function HomeHero() {
  const navigate = useNavigate();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleAutoplay = () => {
    if (isAutoplayPaused) {
      swiperInstance?.autoplay.start();
    } else {
      swiperInstance?.autoplay.stop();
    }
    setIsAutoplayPaused(!isAutoplayPaused);
  };

  return (
    <section className="relative pt-20 pb-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ 
              delay: 6000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white/70 !opacity-70',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100 !w-8',
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            loop={true}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              '--swiper-pagination-color': '#ffffff',
              '--swiper-pagination-bullet-inactive-color': '#ffffff',
            }}
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative min-h-[500px] md:min-h-[600px]">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 grid md:grid-cols-2 items-center h-full min-h-[500px] md:min-h-[600px]">
                    <div className="px-6 md:px-12 py-12">
                      {/* Badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">
                        {slide.badge}
                      </div>
                      
                      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg text-white/90 mb-6 max-w-xl">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button 
                          onClick={() => navigate(slide.buttonLink)} 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
                        >
                          {slide.buttonText}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate("/plot")} 
                          className="px-6 py-3 rounded-full border-2 border-white/50 hover:border-white text-white transition-all duration-300 hover:bg-white/10"
                        >
                          Browse Plots
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          {swiperInstance && <CustomNavigation swiper={swiperInstance} />}

          {/* Autoplay Toggle */}
          <button
            onClick={toggleAutoplay}
            className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
            aria-label={isAutoplayPaused ? "Play autoplay" : "Pause autoplay"}
          >
            {isAutoplayPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Slide Counter */}
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            {currentSlide + 1} / {heroSlides.length}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-center max-w-4xl mx-auto">
      {features.map((f, i) => (
        <div key={i} className="text-center group cursor-pointer">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${f.bg}`}>
            <f.icon className={`w-8 h-8 ${f.color}`} />
          </div>
          <p className="text-sm font-medium mt-3 text-gray-700">{f.label}</p>
        </div>
      ))}
    </div>
  );
}

function CrisisSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">India's Real Estate Crisis</h2>
            <p className="text-gray-700 mt-4 text-lg max-w-xl">Over 22% of land deals face fraud, disputes, or double registrations. With 84% of household wealth in property, lack of verification is the biggest trap for buyers.</p>
            <div className="mt-8 w-64 mx-auto md:mx-0">
              <Doughnut data={pieData} options={{ 
                plugins: { 
                  legend: { position: "bottom", labels: { padding: 20 } },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw}%`;
                      }
                    }
                  }
                } 
              }} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                <span className="text-red-600">⚠️</span> Why this happens
              </h3>
              <p className="text-gray-600 mt-2">Missing verification, manual paperwork, and opaque title chains increase disputes.</p>
            </div>

            <div className="bg-amber-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                <span className="text-amber-600">✓</span> How InfoLand helps
              </h3>
              <p className="text-gray-600 mt-2">Government map matching + lawyer reports reduce fraud before you pay.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SavingsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-teal-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{savingContent.heading}</h2>
            <p className="text-gray-700 mt-4 text-lg max-w-lg">{savingContent.text}</p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
                <div className="text-3xl font-bold text-green-600">{savingContent.percentage}%</div>
                <div className="text-sm text-gray-500">Avg. savings</div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-3">Compared to broker + manual legal process</div>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center gap-2">
                  Start Verification
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto md:mx-0">
            <Bar
              data={graphData}
              options={{
                responsive: true,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `Fraud Risk: ${context.raw}%`;
                      }
                    }
                  }
                },
                scales: { 
                  y: { 
                    beginAtZero: true, 
                    max: 25,
                    title: {
                      display: true,
                      text: 'Risk Percentage'
                    }
                  } 
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Why Choose InfoLand?</h2>
        <p className="text-gray-600 mb-10 text-lg max-w-3xl mx-auto">A perfect blend of technology + legal verification to protect your property investments.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((w, i) => {
            const Icon = w.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left h-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-full bg-indigo-50">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{w.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{w.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">InfoLand</h3>
            <p className="text-gray-400 mb-4 max-w-md">Zero Brokers. Zero Fraud. Total Transparency. Backed by verified land records & certified legal review.</p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors duration-300">
                Get Started
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-4 py-2 rounded-full transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">Property Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Legal Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Map Search</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} InfoLand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Main Page Export ---------------- */
export default function HomePage() {
  return (
    <div className="min-h-screen text-gray-800 bg-white">
      <HomeHero />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Our Key Features</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Discover how InfoLand revolutionizes property verification with cutting-edge technology and legal expertise.</p>
          <FeaturesGrid />
        </div>
      </section>

      <CrisisSection />

      <SavingsSection />

      <WhyUsSection />

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Zero Brokers. Zero Fraud. Total Transparency.</h3>
          <p className="mt-2 text-blue-100 text-lg max-w-3xl mx-auto mb-8">Backed by verified land records & certified legal review.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
              Start Your Verification
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white hover:bg-white hover:text-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}