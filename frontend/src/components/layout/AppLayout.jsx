import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import GlobalSearchOverlay from './GlobalSearchOverlay.jsx';

const AppLayout = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-slate-900 selection:bg-primary selection:text-white">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      {/* 
        pt-16 accounts for the fixed navbar.
        If Navbar height changes, this needs adjustment. 
      */}
      <main className="flex-grow flex flex-col relative z-10 pt-16">
        {children}
      </main>
      <Footer />
      
      <GlobalSearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
};

export default AppLayout;
