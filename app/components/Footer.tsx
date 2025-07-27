import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-white border-t border-slate-100 text-center text-xs text-slate-500">
      &copy; {new Date().getFullYear()} ayra Statistics. All rights reserved.
    </footer>
  );
} 