'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
            <Link href="/" className="text-xl font-medium text-slate-800 tracking-wider uppercase">
              ayra Statistics
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              <a 
                href="/welcome" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Welcome
              </a>
              <a 
                href="/home" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Home
              </a>
              <a 
                href="/services" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Services
              </a>
              <a 
                href="/consultation" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Consultation
              </a>
              <a 
                href="/about" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                About
              </a>
              <a 
                href="/blog" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Blog
              </a>
              <a 
                href="/contact" 
                className="text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider transition-colors duration-300"
              >
                Contact
              </a>
            </div>
            <a 
              href="/calculator"
              className="px-6 py-2 border border-teal-600 text-teal-600 text-sm font-light uppercase tracking-wider rounded hover:bg-teal-600 hover:text-white transition-all duration-300 inline-block text-center"
            >
              Sample Size Calculator
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-800 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-4 bg-white/95 backdrop-blur-md border-t border-slate-100">
            <a 
              href="/welcome" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Welcome
            </a>
            <a 
              href="/home" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="/services" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a 
              href="/consultation" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Consultation
            </a>
            <a 
              href="/about" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a 
              href="/blog" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </a>
            <a 
              href="/contact" 
              className="block px-3 py-2 text-slate-600 hover:text-teal-600 font-light text-sm uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className="px-3 pt-4">
              <a 
                href="/calculator"
                className="w-full px-6 py-2 border border-teal-600 text-teal-600 text-sm font-light uppercase tracking-wider rounded hover:bg-teal-600 hover:text-white transition-all duration-300 inline-block text-center"
                onClick={() => setIsOpen(false)}
              >
                Sample Size Calculator
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}