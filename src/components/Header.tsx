import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

const toolsMenu = [
  { label: 'Compress PDF', page: 'compress', icon: '⚡' },
  { label: 'Merge PDF', page: 'merge', icon: '🔗' },
  { label: 'Split PDF', page: 'split', icon: '✂️' },
  { label: 'PDF to Word', page: 'pdf-to-word', icon: '📝' },
  { label: 'Word to PDF', page: 'word-to-pdf', icon: '📄' },
  { label: 'PDF to JPG', page: 'pdf-to-jpg', icon: '🖼️' },
  { label: 'JPG to PDF', page: 'jpg-to-pdf', icon: '📎' },
  { label: 'PDF to Excel', page: 'pdf-to-excel', icon: '📊' },
  { label: 'PDF to PPT', page: 'pdf-to-ppt', icon: '📋' },
  { label: 'PDF to PNG', page: 'pdf-to-png', icon: '🖼️' },
  { label: 'Rotate PDF', page: 'rotate', icon: '🔄' },
  { label: 'Unlock PDF', page: 'unlock', icon: '🔓' },
  { label: 'Protect PDF', page: 'protect', icon: '🔒' },
  { label: 'Sign PDF', page: 'sign', icon: '✍️' },
];

export default function Header({ currentPage, onNavigate, isLoggedIn }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'PDF Tools', page: 'tools' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Blog', page: 'blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            aria-label="YesToPDF home"
          >
            <img src="/logo.svg" alt="YesToPDF" width="190" height="42" className="h-9 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {link.label}
              </button>
            ))}

            {/* Tools dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Tools
                <svg className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 grid grid-cols-2 gap-0.5 z-50 animate-fadein">
                  {toolsMenu.map(tool => (
                    <button
                      key={tool.page}
                      onClick={() => { onNavigate(tool.page); setToolsOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 text-left"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span className="text-base">{tool.icon}</span>
                      <span className="font-medium text-xs">{tool.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                    A
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Log in
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-sm px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', fontFamily: 'Manrope, sans-serif' }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-1 animate-fadein">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold ${
                currentPage === link.page ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-slate-100 mt-2 pt-2 flex flex-col gap-2">
            <button
              onClick={() => { onNavigate('login'); setMobileOpen(false); }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Log in
            </button>
            <button
              onClick={() => { onNavigate('signup'); setMobileOpen(false); }}
              className="w-full text-center py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)', fontFamily: 'Manrope, sans-serif' }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
