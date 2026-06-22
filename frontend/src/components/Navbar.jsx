import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart3,
  ClipboardList,
  Star,
  Scale,
  Info,
  Mail,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import avatarImg from "../assets/avatar.png";
import { FaRegUser } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/stats", label: "Stats", icon: BarChart3 },
    { path: "/whyus", label: "Why Us", icon: Star },
    { path: "/lawyers", label: "Lawyers", icon: Scale },
    { path: "/plans", label: "Plans", icon: ClipboardList },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm tracking-wide">IL</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              InfoLand Portal
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Auth Section */}
          <div className="relative flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                {/* Avatar Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={avatarImg}
                    alt="User avatar"
                    className={`w-8 h-8 rounded-full ring-2 ring-blue-500 transition-transform ${
                      isDropdownOpen ? "scale-105" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
                title="Login"
              >
                <FaRegUser className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
