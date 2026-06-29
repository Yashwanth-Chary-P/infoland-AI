import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User } from 'lucide-react';
import Button from '../common/Button.jsx';

const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
  }, [location.pathname]);

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
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
              <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
                IL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                InfoLand <span className="text-slate-500 font-medium text-lg">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 items-center mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive(link.path)
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="w-24 text-left">Search...</span>
              <kbd className="hidden lg:inline-flex items-center justify-center text-[10px] font-sans font-semibold bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400 shadow-sm">
                ⌘K
              </kbd>
            </button>
            <div className="flex items-center gap-3">
              <Link to="/login" className="focus:outline-none rounded-md">
                <Button variant="ghost" size="sm" className="hidden lg:flex font-medium text-slate-600 hover:text-slate-900">Sign in</Button>
              </Link>
              <Link to="/register" className="focus:outline-none rounded-md">
                <Button variant="primary" size="sm" className="bg-slate-900 hover:bg-slate-800 text-white font-medium border-transparent shadow-sm">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
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
            <div className="pt-4 pb-4 border-t border-slate-200">
              <div className="flex items-center px-5 space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-500" />
                  </div>
                </div>
                <div>
                  <Link to="/login" className="block text-base font-medium text-slate-700 hover:text-slate-900">Sign in</Link>
                  <Link to="/register" className="block mt-1 text-sm font-medium text-primary hover:text-primary-hover">Create an account</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
