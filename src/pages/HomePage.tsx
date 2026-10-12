import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const allTools = [
  { id: 'compress', name: 'Compress PDF', desc: 'Reduce PDF file size while maintaining quality.', color: '#4F46E5', bg: '#EEF2FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  )},
  { id: 'merge', name: 'Merge PDF', desc: 'Combine multiple PDF files into one document.', color: '#7C3AED', bg: '#F5F3FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6H5a2 2 0 00-2 2v9a2 2 0 002 2h11a2 2 0 002-2v-1"/>
      <path d="M15 3h4.5a.5.5 0 01.5.5v4.5"/>
      <path d="M10 14L20 4"/>
    </svg>
  )},
  { id: 'split', name: 'Split PDF', desc: 'Extract pages or split a PDF into multiple files.', color: '#EC4899', bg: '#FDF2F8', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <path d="M6 21V9a9 9 0 009 9"/>
    </svg>
  )},
  { id: 'pdf-to-word', name: 'PDF to Word', desc: 'Convert PDF files into editable Word documents.', color: '#2563EB', bg: '#EFF6FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )},
  { id: 'word-to-pdf', name: 'Word to PDF', desc: 'Convert Word documents into professional PDFs.', color: '#0891B2', bg: '#ECFEFF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  )},
  { id: 'pdf-to-jpg', name: 'PDF to JPG', desc: 'Convert PDF pages into high-quality JPG images.', color: '#D97706', bg: '#FFFBEB', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  )},
  { id: 'jpg-to-pdf', name: 'JPG to PDF', desc: 'Create PDF files from your JPG images.', color: '#16A34A', bg: '#F0FDF4', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )},
  { id: 'pdf-to-excel', name: 'PDF to Excel', desc: 'Convert PDF tables into editable Excel files.', color: '#059669', bg: '#ECFDF5', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
    </svg>
  )},
  { id: 'pdf-to-ppt', name: 'PDF to PPT', desc: 'Convert PDF files into PowerPoint presentations.', color: '#DC2626', bg: '#FEF2F2', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )},
  { id: 'rotate', name: 'Rotate PDF', desc: 'Rotate PDF pages and save the corrected document.', color: '#7C3AED', bg: '#F5F3FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
    </svg>
  )},
  { id: 'protect', name: 'Protect PDF', desc: 'Password protect your sensitive PDF files.', color: '#1D4ED8', bg: '#EFF6FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )},
  { id: 'unlock', name: 'Unlock PDF', desc: 'Remove password protection from PDF files.', color: '#F59E0B', bg: '#FFFBEB', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 019.9-1"/>
    </svg>
  )},
  { id: 'sign', name: 'Sign PDF', desc: 'Add your electronic signature to PDF documents.', color: '#4F46E5', bg: '#EEF2FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  )},
  { id: 'pdf-to-word', name: 'Edit PDF', desc: 'Edit text and content in your PDF files directly.', color: '#6366F1', bg: '#EEF2FF', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )},
];

const categories = [
  {
    title: 'Convert PDF',
    desc: 'Convert documents, images, and presentations to and from PDF format.',
    page: 'pdf-to-word',
    color: '#4F46E5',
    bg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
    icon: '↔️',
    tools: ['PDF to Word', 'PDF to JPG', 'Word to PDF', 'PDF to Excel'],
  },
  {
    title: 'Compress PDF',
    desc: 'Reduce file size for easier sharing and cloud storage.',
    page: 'compress',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    icon: '⚡',
    tools: ['Basic Compression', 'Strong Compression', 'Max Compression'],
  },
  {
    title: 'Edit PDF',
    desc: 'Edit, sign, annotate and organize your PDF documents.',
    page: 'sign',
    color: '#EC4899',
    bg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    icon: '✏️',
    tools: ['Sign PDF', 'Edit PDF', 'Protect PDF', 'Unlock PDF'],
  },
  {
    title: 'Organize PDF',
    desc: 'Merge, split, rotate and rearrange your PDF pages.',
    page: 'merge',
    color: '#059669',
    bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
    icon: '📁',
    tools: ['Merge PDF', 'Split PDF', 'Rotate PDF'],
  },
];

const steps = [
  {
    num: '01',
    title: 'Choose a Tool',
    desc: 'Select from 14+ PDF tools for any task you need.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Upload Your File',
    desc: 'Drag and drop your document or browse your device. Up to 100 MB.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Download Result',
    desc: 'Your processed file is ready instantly. Download and done.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 17 12 21 16 17"/>
        <line x1="12" y1="3" x2="12" y2="21"/>
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Marketing Manager',
    company: 'BrightPath Solutions',
    avatar: 'PM',
    avatarColor: '#4F46E5',
    review: "YesToPDF has saved me hours every week. Merging client reports used to be a chore — now it takes under a minute.",
    stars: 5,
  },
  {
    name: 'James Okafor',
    role: 'Freelance Consultant',
    company: 'Independent',
    avatar: 'JO',
    avatarColor: '#7C3AED',
    review: "The compression quality is excellent. I send proposal PDFs to clients and they always look sharp, even at a fraction of the original size.",
    stars: 5,
  },
  {
    name: 'Lucia Fernández',
    role: 'High School Teacher',
    company: 'Westlake Academy',
    avatar: 'LF',
    avatarColor: '#EC4899',
    review: "I use the JPG to PDF tool every day to bundle student handouts. It's fast, simple, and works perfectly on my phone.",
    stars: 5,
  },
];

const faqItems = [
  { q: 'Is YesToPDF free?', a: 'Yes! The free plan gives you access to all core PDF tools with standard file size limits. Pro and Business plans unlock larger files, batch processing, and priority speed.' },
  { q: 'How large can my PDF file be?', a: 'Free users can upload files up to 25 MB per file. Pro users get up to 200 MB, and Business users get up to 1 GB per file.' },
  { q: 'Are my files secure?', a: 'All file transfers are encrypted with SSL/TLS. We automatically delete processed files within 1 hour of processing — your documents stay private.' },
  { q: 'How long are uploaded files stored?', a: 'Uploaded and processed files are deleted automatically after 1 hour. You can also delete them immediately from the download screen.' },
  { q: 'Can I use YesToPDF on mobile?', a: 'Absolutely. YesToPDF is fully responsive and works great on phones and tablets — no app download required.' },
  { q: 'Do I need to install any software?', a: "No installation needed. YesToPDF works entirely in your browser — just upload, process, and download." },
  { q: 'Can I process multiple files at once?', a: 'Batch processing is available on Pro and Business plans. Free users can process one file at a time.' },
  { q: 'Which file formats are supported?', a: 'We support PDF, Word (.docx, .doc), Excel (.xlsx), PowerPoint (.pptx), and image formats (JPG, PNG, TIFF).' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [dragging, setDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    onNavigate('compress');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F8FAFC 40%, #F5F3FF 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }} />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-4 py-1.5 text-sm text-indigo-600 font-semibold mb-6 shadow-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}>
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                14+ PDF Tools · Free to start
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: 'Manrope, sans-serif', color: '#0F172A' }}>
                Everything You Need to{' '}
                <span className="gradient-text">Work With PDFs</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                Convert, compress, merge, split, edit and manage your PDF files online — quickly and securely. No software needed.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('tools')}
                  className="btn-primary text-base"
                >
                  Explore PDF Tools
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button
                  onClick={() => onNavigate('compress')}
                  className="btn-secondary text-base"
                >
                  Compress a PDF
                </button>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-2">
                  {['#4F46E5','#7C3AED','#EC4899','#F59E0B'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: c }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">Trusted by 50,000+ users</p>
                </div>
              </div>
            </div>

            {/* Upload Card */}
            <div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => onNavigate('compress')}
                className={`bg-white rounded-3xl p-8 cursor-pointer border-2 transition-all shadow-xl ${
                  dragging
                    ? 'border-indigo-500 bg-indigo-50 drop-active'
                    : 'border-dashed border-slate-200 hover:border-indigo-400 hover:shadow-2xl'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Drop your PDF here
                  </h3>
                  <p className="text-slate-500 mb-6">or click to browse files</p>

                  <button
                    className="btn-primary px-8 py-3 text-sm"
                  >
                    Choose File
                  </button>

                  <p className="mt-4 text-xs text-slate-400">Maximum file size: 100 MB</p>

                  <div className="mt-6 flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span className="text-xs text-green-700 font-medium">Your files are processed securely.</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Files Processed', value: '2M+' },
                  { label: 'Tools Available', value: '14+' },
                  { label: 'User Rating', value: '4.9★' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-slate-100">
                    <div className="text-lg font-extrabold text-indigo-600" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Popular PDF Tools
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to manage your documents — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allTools.map(tool => (
            <button
              key={tool.id + tool.name}
              onClick={() => onNavigate(tool.id)}
              className="tool-card bg-white rounded-2xl p-5 text-left border border-slate-100 shadow-sm group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{ background: tool.bg, color: tool.color }}>
                {tool.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {tool.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100" style={{ color: tool.color }}>
                Use Tool
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('tools')}
            className="btn-secondary"
          >
            View All PDF Tools
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              PDF Tools for Every Task
            </h2>
            <p className="text-slate-500 text-lg">Organized by what you need to do.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => (
              <button
                key={cat.title}
                onClick={() => onNavigate(cat.page)}
                className="tool-card text-left rounded-3xl p-6 border border-slate-100 bg-white shadow-sm"
              >
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map(t => (
                    <span key={t} className="text-xs rounded-full px-2.5 py-1 font-medium"
                      style={{ background: '#F1F5F9', color: '#475569' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Simple. Fast. Done.
          </h2>
          <p className="text-slate-500 text-lg">Three steps to any PDF task.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}>
                  {step.icon}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center"
                  style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Your Documents Stay Private
          </h2>
          <p className="text-slate-400 mb-12">We treat your files with the same care you do.</p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🔐',
                title: 'Secure Upload',
                desc: 'All file transfers are encrypted with 256-bit SSL/TLS. Your data is never exposed in transit.',
              },
              {
                icon: '🗑️',
                title: 'Auto File Deletion',
                desc: 'Processed files are automatically removed within 1 hour. No lingering copies.',
              },
              {
                icon: '🛡️',
                title: 'Privacy Focused',
                desc: "We never access your document content for advertising or share it with third parties.",
              },
            ].map(f => (
              <div key={f.title} className="bg-slate-800 rounded-2xl p-6 text-left">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Loved by Thousands
            </h2>
            <p className="text-slate-500 text-lg">See what our users have to say.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: t.avatarColor }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              >
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {item.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-500 leading-relaxed animate-fadein">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Start Working Smarter With PDFs
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Join 50,000+ professionals using YesToPDF every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl text-base hover:shadow-lg"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="border-2 border-white/40 text-white font-bold px-8 py-3 rounded-xl text-base hover:bg-white/10"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Explore All Tools
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
