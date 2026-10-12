interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: 'PDF Tools',
      links: [
        { label: 'Compress PDF', page: 'compress' },
        { label: 'Merge PDF', page: 'merge' },
        { label: 'Split PDF', page: 'split' },
        { label: 'PDF to Word', page: 'pdf-to-word' },
        { label: 'PDF to JPG', page: 'pdf-to-jpg' },
        { label: 'Rotate PDF', page: 'rotate' },
      ],
    },
    {
      title: 'Convert',
      links: [
        { label: 'Word to PDF', page: 'word-to-pdf' },
        { label: 'JPG to PDF', page: 'jpg-to-pdf' },
        { label: 'PDF to Excel', page: 'pdf-to-excel' },
        { label: 'PDF to PPT', page: 'pdf-to-ppt' },
        { label: 'Protect PDF', page: 'protect' },
        { label: 'Unlock PDF', page: 'unlock' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', page: 'home' },
        { label: 'Pricing', page: 'pricing' },
        { label: 'Blog', page: 'blog' },
        { label: 'Contact', page: 'contact' },
        { label: 'Careers', page: 'home' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', page: 'home' },
        { label: 'Terms of Service', page: 'home' },
        { label: 'Cookie Policy', page: 'home' },
        { label: 'Security', page: 'home' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="1" width="10" height="13" rx="1.5" fill="white" opacity="0.9" />
                  <rect x="6" y="4" width="4" height="1" rx="0.5" fill="#4F46E5" />
                  <rect x="6" y="6.5" width="4" height="1" rx="0.5" fill="#4F46E5" />
                  <rect x="6" y="9" width="2.5" height="1" rx="0.5" fill="#4F46E5" />
                </svg>
              </div>
              <span className="font-extrabold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                YesToPDF
              </span>
            </button>
            <p className="text-sm leading-relaxed text-slate-500 mb-4">
              All your PDF tools in one simple workspace. Fast, secure, and free to start.
            </p>
            <div className="flex gap-3">
              {['twitter', 'linkedin', 'github'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white text-xs font-bold">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-sm text-slate-500 hover:text-slate-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {year} YesToPDF. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-800 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
