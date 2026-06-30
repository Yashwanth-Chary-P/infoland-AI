import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import Button from '../common/Button.jsx';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Click outside profile dropdown to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Insights', path: '/insights' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-slate-200/80 shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105 shadow-sm">
                IL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                InfoLand <span className="text-slate-400 font-medium text-lg">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive(link.path)
                    ? 'text-slate-900 bg-slate-100/80'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm hover:shadow"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="w-24 text-left">Search...</span>
              <kbd className="hidden lg:inline-flex items-center justify-center text-[10px] font-sans font-semibold bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 shadow-sm">
                ⌘K
              </kbd>
            </button>
            
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold border border-blue-200">
                      {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 origin-top-right"
                      >
                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                          <p className="text-sm font-medium text-slate-900 truncate">Account</p>
                          <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        </div>
                        <Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                          <User className="w-4 h-4 mr-2 text-slate-400" /> Dashboard
                        </Link>
                        <Link to="/explore" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                          <Settings className="w-4 h-4 mr-2 text-slate-400" /> Settings
                        </Link>
                        <div className="h-px bg-slate-100 my-1 mx-2"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="focus:outline-none rounded-md">
                    <Button variant="ghost" size="sm" className="hidden lg:flex font-medium text-slate-600 hover:text-slate-900">Sign in</Button>
                  </Link>
                  <Link to="/register" className="focus:outline-none rounded-md">
                    <Button variant="primary" size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-medium border-transparent shadow-sm rounded-full px-5">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-border overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary bg-blue-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-6 border-t border-slate-100">
              <div className="flex items-center px-6 space-x-3">
                {currentUser ? (
                  <>
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <User className="h-6 w-6 text-blue-700" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-slate-900 truncate">Account</p>
                      <p className="text-sm font-medium text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="ml-auto p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-rose-600 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <div className="w-full grid gap-2">
                    <Link to="/login" className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Sign in</Link>
                    <Link to="/register" className="w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-slate-900 hover:bg-slate-800">Create an account</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
