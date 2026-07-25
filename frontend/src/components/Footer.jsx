import React from 'react';
import { Activity, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 py-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-slate-200">PULSE IQ</span>
          <span className="text-slate-500">— Instant Website Audits</span>
        </div>

        {/* Required Credit Line */}
        <div className="text-slate-300 font-medium text-center">
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline font-semibold transition-colors underline-offset-4"
          >
            Digital Heroes
          </a>{' '}
          Training Task
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} PULSE IQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
