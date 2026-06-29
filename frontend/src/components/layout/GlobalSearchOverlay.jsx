import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight } from 'lucide-react';

const GlobalSearchOverlay = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 relative z-50 flex flex-col max-h-[80vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Search Input Area */}
            <div className="relative border-b border-slate-100 flex items-center px-4 py-4 sm:px-6">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                className="h-10 w-full border-0 bg-transparent pl-4 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-lg focus:outline-none"
                placeholder="Search properties, regions, owners..."
                role="combobox"
                aria-expanded="false"
                aria-controls="options"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 rounded px-2 py-1">
                ESC
              </kbd>
            </div>

            {/* Results Area (UI Shell only for Module 01) */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="text-center py-12">
                <Command className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-sm font-medium text-slate-900">Global Search</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Search functionality will be implemented in Module 03.
                </p>
                <div className="mt-6 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Waiting for Module 03...
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-6 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="font-sans bg-white border border-slate-300 rounded px-1 shadow-sm">↑</kbd><kbd className="font-sans bg-white border border-slate-300 rounded px-1 shadow-sm">↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="font-sans bg-white border border-slate-300 rounded px-1 shadow-sm">Enter</kbd> to select</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                Powered by InfoLand Engine
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearchOverlay;
