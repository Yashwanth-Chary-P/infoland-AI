import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-10 py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          
          {/* Brand */}
          <div className="space-y-6 xl:col-span-1">
            <Link to="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md w-max">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold shadow-sm">
                IL
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                InfoLand <span className="text-slate-400 font-medium text-lg">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              AI-Powered Property Verification & Intelligence Platform. Ensure properties are legally, financially and ownership-wise safe before purchase.
            </p>
            <div className="flex space-x-5">
              {/* Social placeholders */}
              <a href="#" className="text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-3">
                  <li><Link to="/explore" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Explore Properties</Link></li>
                  <li><Link to="/insights" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Dataset Insights</Link></li>
                  <li><Link to="/dashboard" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Intelligence Dashboard</Link></li>
                  <li><span className="text-sm text-slate-400 flex items-center gap-2">AI Assistant <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">Coming Soon</span></span></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li><Link to="/about" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">About Us</Link></li>
                  <li><Link to="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Contact</Link></li>
                  <li><Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Careers</Link></li>
                  <li><Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Blog</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-3">
                  <li><Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Terms of Service</Link></li>
                  <li><Link to="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Data Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} InfoLand AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-600">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
